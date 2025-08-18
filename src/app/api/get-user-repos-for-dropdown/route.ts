import "server-only";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getOctokit } from "@/lib/octokit";
import { GITHUB_OAUTH_PROVIDER } from "@/constants/oauth-providers";
import { auth } from "@/lib/auth";
import { getCachedAccessToken } from "@/lib/token-cache";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized - No valid session found" }, { status: 401 });
    }

    const userToken = await getCachedAccessToken(GITHUB_OAUTH_PROVIDER, session.session.userId, await headers());

    const octokit = getOctokit(userToken.accessToken);

    const resp = await octokit.paginate(octokit.rest.repos.listForAuthenticatedUser, {
      per_page: 100,
    });

    return NextResponse.json(resp);
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
