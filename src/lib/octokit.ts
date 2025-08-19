import "server-only";
import { Octokit } from "octokit";
import { GITHUB_API_VERSION } from "@/constants/octokit-constants";
import { MAX_PAGE_SIZE } from "@/constants/octokit-constants";

let octokitInstance: Octokit | null = null;

/**
 * Returns a singleton Octokit instance for a given token
 * @param token - GitHub user or app access token
 */
export function getOctokit(token: string): Octokit {
  if (!token) {
    throw new Error("GitHub token is required to initialize Octokit");
  }

  // Reuse the same instance if it already exists for this token
  if (!octokitInstance) {
    octokitInstance = new Octokit({
      auth: token,
      request: {
        headers: {
          "X-GitHub-Api-Version": GITHUB_API_VERSION,
        },
        params: {
          per_page: MAX_PAGE_SIZE,
        },
      },
    });
  }

  return octokitInstance;
}
