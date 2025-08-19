import { NextRequest } from "next/server";
import { AUTHORIZATION_HEADER_KEY } from "./authorization-header-key";

/**
 * Used to test an API endpoint using cURL, Postman, Hoppscotch, etc.
 *
 * Header: Authorization: token <your-github-access-token>
 *
 * To get the token: Use BetterAuth's `session` object: `session.session.token`
 *
 * @param request: NextRequest - The incoming request object
 * @returnsThe GitHub user token from the request headers if present, otherwise null
 */
export function getUserTokenFromRequestHeaders(request: NextRequest): string | null {
  const authorizationHeader = request.headers.get(AUTHORIZATION_HEADER_KEY);

  if (!authorizationHeader) {
    return null;
  }

  const splits = authorizationHeader.split(" ");

  if (splits.length !== 2 && splits[1] !== "token") {
    return null;
  }

  return splits[1];
}
