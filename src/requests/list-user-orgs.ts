import { API_LIST_USER_ORGS_URL } from "@/urls/api-urls";

export async function listUserOrgs(username: string) {
  const resp = await fetch(`${API_LIST_USER_ORGS_URL}?username=${username}`);

  if (!resp.ok) {
    throw new Error(`Failed to fetch user organizations: ${resp.statusText}`);
  }

  return resp.json();
}
