import "server-only";
import { auth } from "@/lib/auth";

// gah du
type AccessTokenResponse = Awaited<ReturnType<typeof auth.api.getAccessToken>>;

const tokenCache = new Map<string, AccessTokenResponse>();

export async function getCachedAccessToken(
  providerId: string,
  userId: string,
  headers: Headers,
): Promise<AccessTokenResponse> {
  const cacheKey = `${providerId}:${userId}`;
  const cached = tokenCache.get(cacheKey);

  if (cached?.accessToken && cached.accessTokenExpiresAt && cached.accessTokenExpiresAt.getTime() > Date.now()) {
    return cached;
  }

  const userToken = await auth.api.getAccessToken({
    body: { providerId, userId },
    headers,
  });

  if (!userToken?.accessToken) {
    throw new Error("No access token found for user");
  }

  tokenCache.set(cacheKey, userToken);

  return userToken;
}
