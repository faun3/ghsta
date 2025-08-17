import { GITHUB_OAUTH_PROVIDER } from "@/constants/oauth-providers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getOctokit } from "@/lib/octokit";

export async function GET() {
  try {
    // Get the user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.session?.userId) {
      return NextResponse.json(
        { error: "Unauthorized - No valid session found" },
        { status: 401 },
      );
    }

    // Get the GitHub access token for the user
    const userToken = await auth.api.getAccessToken({
      body: {
        providerId: GITHUB_OAUTH_PROVIDER,
        userId: session.session.userId,
      },
      headers: await headers(),
    });

    if (!userToken?.accessToken) {
      return NextResponse.json(
        { error: "No GitHub access token found" },
        { status: 401 },
      );
    }

    // Initialize Octokit with the user's token
    const octokit = getOctokit(userToken.accessToken);

    // Fetch the user's repositories
    const repos = await octokit.rest.repos.listForAuthenticatedUser();

    return NextResponse.json(repos.data);
  } catch (error) {
    console.error("Error fetching user repositories:", error);

    // Handle specific GitHub API errors
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
      { error: "Failed to fetch repositories" },
      { status: 500 },
    );
  }
}
