import type { Context } from "@actions/github/lib/context";

import {
  NotDependabotPrError,
  NotValidSemverError,
  ParseError,
  ReviewAlreadyPendingError,
  UnsupportedFeatureError,
} from "./errors";
import * as github from "./lib/github";
import * as parse from "./lib/parse";
import * as version from "./lib/version";

export default async function autoMerge(
  context: Context,
  rawDisallowList: string,
  rawReviewers: string,
): Promise<["OK" | "NOK", string]> {
  const { pull_request: pullRequest } = context.payload;
  const reviewers = rawReviewers.split(" ");
  try {
    if (context.actor !== "dependabot[bot]") {
      throw new NotDependabotPrError();
    }

    if (pullRequest) {
      const bump = {
        dependency: parse.getName(pullRequest.title),
        from: version.get(parse.getRawVersion(pullRequest.title, "from")),
        to: version.get(parse.getRawVersion(pullRequest.title, "to")),
      };

      const proceed = version.isBumpAllowed(
        bump,
        version.diff(bump.from.full, bump.to.full),
        parse.getDisallowList(rawDisallowList),
      );

      const pullRequestParam = { repo: context.repo, prNumber: pullRequest.number };
      if (proceed) {
        await github.approve(pullRequestParam);
        await github.squashAndMerge(pullRequestParam);
      } else {
        await github.askForReview(
          { repo: context.repo, prNumber: pullRequest.number },
          reviewers,
          "Auto merge on this dependency is disabled.",
        );
      }
    }
    return ["OK", "Automerge process ended."];
  } catch (error) {
    if (
      error instanceof NotValidSemverError ||
      error instanceof UnsupportedFeatureError ||
      error instanceof ParseError
    ) {
      if (pullRequest) {
        await github.askForReview({ repo: context.repo, prNumber: pullRequest.number }, reviewers, error.message);
      }
      return ["NOK", error.message];
    } else if (error instanceof NotDependabotPrError) {
      return ["NOK", error.message];
    } else if (error instanceof ReviewAlreadyPendingError) {
      return ["OK", error.message];
    } else {
      throw error;
    }
  }
}

export { NotDependabotPrError };
