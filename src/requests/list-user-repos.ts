import { API_LIST_USER_REPOS_URL } from "@/urls/api-urls";

export async function listUserRepos(username: string) {
  const resp = await fetch(`${API_LIST_USER_REPOS_URL}?username=${username}`);

  if (!resp.ok) {
    if (resp.status === 404) {
      throw new Error(`User not found: ${username}`);
    }
    throw new Error(`Failed to fetch repositories for ${username}: ${resp.status} ${resp.statusText}`);
  }

  return resp.json();
}
