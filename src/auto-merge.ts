import type { Context } from "@actions/github/lib/context";

import { NotDependabotPrError, NotValidSemverError, ParseError, UnsupportedFeatureError } from "./errors";
import * as github from "./lib/github";
import * as parse from "./lib/parse";
import * as version from "./lib/version";

export default async function autoMerge(context: Context, rawBlacklist: string): Promise<["OK" | "NOK", string]> {
  const { pull_request: pullRequest } = context.payload;
  try {
    if (context.actor !== "dependabot[bot]") {
      throw new NotDependabotPrError();
    }

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
    return ["OK", "✅ - Automerge process ended."];
  } catch (error) {
    if (
      error instanceof NotDependabotPrError ||
      error instanceof NotValidSemverError ||
      error instanceof UnsupportedFeatureError ||
      error instanceof ParseError
    ) {
      if (pullRequest) {
        await github.askForReview({ repo: context.repo, prNumber: pullRequest.number });
      }
      return ["NOK", error.message];
    } else {
      throw error;
    }
  }
}

export { NotDependabotPrError };
