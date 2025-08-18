import { API_LIST_USER_REPOS_URL } from "@/urls/api-urls";

export async function listUserRepos(username: string) {
  const resp = await fetch(`${API_LIST_USER_REPOS_URL}?username=${username}`);

  if (!resp.ok) {
    throw new Error(`Failed to fetch repositories for ${username}: ${resp.statusText}`);
  }

  return resp.json();
}
