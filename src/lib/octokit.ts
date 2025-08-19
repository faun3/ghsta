import "server-only";
import { Octokit } from "octokit";
import { GITHUB_API_VERSION } from "@/constants/api-versions";

let octokitInstance: Octokit | null = null;

// TODO: we need to handle octokit errors https://docs.github.com/en/rest/guides/scripting-with-the-rest-api-and-javascript?apiVersion=2022-11-28#catching-errors

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
      },
    });
  }

  return octokitInstance;
}
