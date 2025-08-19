import "server-only";
import { NextResponse } from "next/server";
import { getOctokit } from "@/lib/octokit";
import { handleApiError } from "@/lib/api-error-handler";

import { requireUsername, requireSession, requireGithubToken } from "@/lib/error-guards";

export async function GET(req: Request) {
  try {
    const username = await requireUsername(req);
    const session = await requireSession();
    const token = await requireGithubToken(session.userId);

    const octokit = getOctokit(token);

    const orgs = await octokit.paginate(octokit.rest.orgs.listForUser, { username });

    return NextResponse.json(orgs);
  } catch (error) {
    return handleApiError(error, "Failed to fetch user organizations");
  }
}
