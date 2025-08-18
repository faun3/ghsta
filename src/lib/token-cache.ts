'use server'
import { auth } from "@/lib/auth";

// gah du
type AccessTokenResponse = Awaited<ReturnType<typeof auth.api.getAccessToken>>;

const tokenCache = new Map<string, AccessTokenResponse>();

export async function getCachedAccessToken(
  providerId: string,
  userId: string,
  headers: Headers
): Promise<AccessTokenResponse> {
  const cacheKey = `${providerId}:${userId}`;
  const cached = tokenCache.get(cacheKey);

  // Check if cached token exists and is still valid
  if (
    cached?.accessToken &&
    cached.accessTokenExpiresAt &&
    cached.accessTokenExpiresAt.getTime() > Date.now()
  ) {
    console.log("Using cached access token for", userId);
    return cached;
  }

  // Fetch fresh token from db
  const userToken = await auth.api.getAccessToken({
    body: { providerId, userId },
    headers,
  });
  console.log("Fetched new access token for", userId);

  if (!userToken?.accessToken) {
    throw new Error("No access token found for user");
  }

  tokenCache.set(cacheKey, userToken);

  return userToken;
}
