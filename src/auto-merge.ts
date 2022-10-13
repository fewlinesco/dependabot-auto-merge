import type { Context } from "@actions/github/lib/context";

import * as github from "./lib/github";

class NotDependabotPrError extends Error {}

export default async function autoMerge(context: Context): Promise<void> {
  if (context.actor !== "dependabot[bot]") {
    throw new NotDependabotPrError();
  }

  const { pull_request: pullRequest } = context.payload;

  if (pullRequest) {
    await github.approve({ repo: context.repo, prNumber: pullRequest.number });
    await github.squashAndMerge({ repo: context.repo, prNumber: pullRequest.number });
  }
}

export { NotDependabotPrError };
