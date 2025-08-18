import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

type ResponseType = RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["response"]["data"];

export async function getAuthenticatedUserReposForCombobox(): Promise<ResponseType> {
  const response = await fetch("http://localhost:3000/api/get-user-repos-for-dropdown");

  return await response.json();
}
