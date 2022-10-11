import type { Context } from "@actions/github/lib/context";

import * as github from "./lib/github";

export class NotDependabotPrError extends Error {
  constructor(message?: string) {
    super();
    this.message = message || "Not a Dependabot PR.";
  }
}

export default async function autoMerge(context: Context): Promise<void> {
  if (context.actor !== "dependabot[bot]") {
    throw new NotDependabotPrError();
  }

  const { pull_request: pullRequest } = context.payload;

  if (pullRequest) {
    await github.review({ repo: context.repo, prNumber: pullRequest.number });
    await github.comment({ repo: context.repo, prNumber: pullRequest.number });
  }
}
