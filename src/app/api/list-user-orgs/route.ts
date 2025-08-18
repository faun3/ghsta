import "server-only";
import { GITHUB_OAUTH_PROVIDER } from "@/constants/oauth-providers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getOctokit } from "@/lib/octokit";
import { getCachedAccessToken } from "@/lib/token-cache";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Missing required parameter: username" },
        { status: 400 }
      );
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.session?.userId) {
      return NextResponse.json(
        { error: "Unauthorized - No valid session found" },
        { status: 401 }
      );
    }

    const userToken = await getCachedAccessToken(
      GITHUB_OAUTH_PROVIDER,
      session.session.userId,
      await headers()
    );

    if (!userToken?.accessToken) {
      return NextResponse.json(
        { error: "No GitHub access token found" },
        { status: 401 }
      );
    }

    const octokit = getOctokit(userToken.accessToken);

    // Fetch user's orgs
    const orgs = await octokit.rest.orgs.listForUser({ username });

    return NextResponse.json(orgs.data);

  } catch (error) {
    console.error("Error fetching user organizations:", error);

    if (error instanceof Error && "status" in error) {
      const status = error.status;
      if (status === 401) {
        return NextResponse.json(
          { error: "GitHub authentication failed" },
          { status: 401 },
        );
      }
      if (status === 403) {
        return NextResponse.json(
          { error: "GitHub API rate limit exceeded" },
          { status: 429 },
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}
