import { API_LIST_ORG_REPOS_URL } from "@/urls/api-urls";

export async function listOrgRepos(org: string) {
  const resp = await fetch(`${API_LIST_ORG_REPOS_URL}?org=${org}`);

  if (!resp.ok) {
    if (resp.status === 404) {
      throw new Error(`Organization not found: ${org}`);
    }
    throw new Error(`Failed to fetch repositories for ${org}: ${resp.status} ${resp.statusText}`);
  }

  return resp.json();
}
