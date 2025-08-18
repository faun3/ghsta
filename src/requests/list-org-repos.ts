import { API_LIST_ORG_REPOS_URL } from "@/urls/api-urls";

export async function listOrgRepos(org: string) {
  const resp = await fetch(`${API_LIST_ORG_REPOS_URL}?org=${org}`);

  if (!resp.ok) {
    throw new Error(`Failed to fetch organization repositories: ${resp.statusText}`);
  }

  return resp.json();
}
