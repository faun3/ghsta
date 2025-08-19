import "server-only";
import { NextResponse } from "next/server";
import { getOctokit } from "@/lib/octokit";
import { handleApiError } from "@/lib/api-error-handler";
import { requireOrg, requireSession, requireGithubToken } from "@/lib/error-guards";

export async function GET(req: Request) {
  try {
    const org = await requireOrg(req);
    const session = await requireSession();
    const token = await requireGithubToken(session.userId);

    const octokit = getOctokit(token);

    const repos = await octokit.paginate(octokit.rest.repos.listForOrg, { org });

    return NextResponse.json(repos);
  } catch (error) {
    return handleApiError(error, "Failed to fetch organization repositories");
  }
}
