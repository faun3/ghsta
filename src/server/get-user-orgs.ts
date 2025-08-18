import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCachedAccessToken } from "@/lib/token-cache";
import { GITHUB_OAUTH_PROVIDER } from "@/constants/oauth-providers";
import { getOctokit } from "@/lib/octokit";

export async function getUserOrgs() {
  const nextHeaders = await headers();

  const session = await auth.api.getSession({
    headers: nextHeaders,
  });

  if (!session?.session.userId) {
    throw new Error("Unauthorized - No valid session found");
  }

  const userToken = await getCachedAccessToken(GITHUB_OAUTH_PROVIDER, session?.session.userId, nextHeaders);

  if (!userToken.accessToken) {
    throw new Error("No GitHub access token found");
  }

  const octokit = getOctokit(userToken.accessToken);

  const username = session.user.name;

  const orgs = await octokit.rest.orgs.listForUser({ username });

  return orgs;
}
