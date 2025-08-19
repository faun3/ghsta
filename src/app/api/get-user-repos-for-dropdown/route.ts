import "server-only";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getOctokit } from "@/lib/octokit";
import { GITHUB_OAUTH_PROVIDER } from "@/constants/oauth-providers";
import { auth } from "@/lib/auth";
import { getCachedAccessToken } from "@/lib/token-cache";
import { getGraphqlApiPaginationParams } from "@/lib/query-params/get-pagination-params";
import { getUserTokenFromRequestHeaders } from "@/lib/request-headers/get-user-token-from-request-headers";

export async function GET(request: NextRequest) {
  try {
    const { first, after } = getGraphqlApiPaginationParams(request);

    // TODO: refactor this request header token / BetterAuth token stuff so we can reuse it everywhere else
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // TODO: whenever the user logs in, make this visible so we can test using Hoppscotch (DEV ONLY!!)
    console.log(session?.session.token);

    const userTokenFromHeaders = getUserTokenFromRequestHeaders(request);

    if (!session && !userTokenFromHeaders) {
      return NextResponse.json({ error: "Unauthorized - No valid session found" }, { status: 401 });
    }

    let tokenToUse = null;
    if (session) {
      tokenToUse = (await getCachedAccessToken(GITHUB_OAUTH_PROVIDER, session.session.userId, await headers()))
        .accessToken;
    } else {
      tokenToUse = userTokenFromHeaders;
    }

    if (!tokenToUse) {
      return NextResponse.json({ error: "Unauthorized - No valid token found" }, { status: 401 });
    }

    const octokit = getOctokit(tokenToUse);

    // TODO: try-catch
    // TODO: handle rate limits
    const { viewer } = await octokit.graphql<{
      viewer: {
        repositories: {
          pageInfo: {
            hasNextPage: boolean;
            endCursor: string | null;
          };
          nodes: {
            id: string;
            name: string;
            updatedAt: string;
          }[];
        };
      };
    }>(
      `
      query ($first: Int!, $after: String) {
        viewer {
          repositories(
            first: $first
            after: $after
            orderBy: { field: UPDATED_AT, direction: DESC }
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              name
            }
          }
        }
      }`,
      {
        first,
        after,
      },
    );

    return NextResponse.json(viewer.repositories.nodes);
  } catch (error) {
    console.error("Error fetching user repositories:", error);

    // Handle specific GitHub API errors
    if (error instanceof Error && "status" in error) {
      const status = error.status;
      if (status === 401) {
        return NextResponse.json({ error: "GitHub authentication failed" }, { status: 401 });
      }
      if (status === 403) {
        return NextResponse.json({ error: "GitHub API rate limit exceeded" }, { status: 429 });
      }
    }

    return NextResponse.json({ error: "Failed to fetch user repositories" }, { status: 500 });
  }
}
