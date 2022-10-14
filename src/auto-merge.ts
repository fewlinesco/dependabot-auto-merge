import type { Context } from "@actions/github/lib/context";

import * as github from "./lib/github";
import * as parse from "./lib/parse";
import * as version from "./lib/version";

class NotDependabotPrError extends Error {}

export default async function autoMerge(context: Context, rawBlacklist: string): Promise<void> {
  console.log("✅", context.actor);
  if (context.actor !== "dependabot[bot]") {
    throw new NotDependabotPrError();
  }

  const { pull_request: pullRequest } = context.payload;

  if (pullRequest) {
    const bump = {
      dependancy: parse.getName(pullRequest.title),
      from: version.get(parse.getRawVersion(pullRequest.title, "from")),
      to: version.get(parse.getRawVersion(pullRequest.title, "to")),
    };

    const proceed = version.isBumpAllowed(
      bump,
      version.diff(bump.from.full, bump.to.full),
      parse.getBlacklist(rawBlacklist),
    );

    const pullRequestParam = { repo: context.repo, prNumber: pullRequest.number };
    if (proceed) {
      await github.approve(pullRequestParam);
      await github.squashAndMerge(pullRequestParam);
    } else {
      await github.askForReview(pullRequestParam);
    }
  }
}

export { NotDependabotPrError };
