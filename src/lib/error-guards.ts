import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { GITHUB_OAUTH_PROVIDER } from "@/constants/oauth-providers";
import { getCachedAccessToken } from "@/lib/token-cache";

// Custom error type to include HTTP status
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export function requireUsername(req: Request): string {
  const username = new URL(req.url).searchParams.get("username");
  if (!username) {
    throw new ApiError("Missing required parameter: username", 400);
  }
  return username;
}

export function requireOrg(req: Request): string {
  const org = new URL(req.url).searchParams.get("org");
  if (!org) {
    throw new ApiError("Missing required parameter: org", 400);
  }
  return org;
}

export async function requireSession(): Promise<{ userId: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.session?.userId) {
    throw new ApiError("Unauthorized - No valid session found", 401);
  }
  return { userId: session.session.userId };
}

export async function requireGithubToken(userId: string): Promise<string> {
  const token = await getCachedAccessToken(GITHUB_OAUTH_PROVIDER, userId, await headers());
  if (!token?.accessToken) {
    throw new ApiError("No GitHub access token found", 401);
  }
  return token.accessToken;
}
