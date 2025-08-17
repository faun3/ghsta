import { API_LIST_USER_REPOS_URL } from "@/urls/api-urls";

export async function listUserRepos() {
  const resp = await fetch(API_LIST_USER_REPOS_URL);

  if (!resp.ok) {
    throw new Error(`Failed to fetch user repositories: ${resp.statusText}`);
  }

  return resp.json();
}
