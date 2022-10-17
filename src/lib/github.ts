import * as core from "@actions/core";
import * as github from "@actions/github";
import {} from "@actions/github/lib/github";
import { GitHub } from "@actions/github/lib/utils";

let client: InstanceType<typeof GitHub>;
function getClient(): InstanceType<typeof GitHub> {
  if (client) {
    return client;
  } else {
    const GITHUB_TOKEN = core.getInput("github-token");
    return github.getOctokit(GITHUB_TOKEN);
  }
}

type ActionPayload = {
  repo: {
    owner: string;
    repo: string;
  };
  prNumber: number;
};

async function approve({ repo, prNumber }: ActionPayload): Promise<void> {
  const octokit = getClient();

  await octokit.rest.pulls.createReview({
    ...repo,
    pull_number: prNumber,
    event: "APPROVE",
  });
}

async function squashAndMerge({ repo, prNumber }: ActionPayload): Promise<void> {
  const octokit = getClient();

  await octokit.rest.issues.createComment({
    ...repo,
    issue_number: prNumber,
    body: "@dependabot squash and merge",
  });
}

async function askForReview({ repo, prNumber }: ActionPayload, reviewers: string[], message?: string): Promise<void> {
  const octokit = getClient();

  const body =
    "Manual check needed" +
    (message ? ":\n**" + message + "**" : ".") +
    "\n" +
    reviewers.reduce((acc, reviewer) => `${acc}@${reviewer} `, "");

  await Promise.all([
    octokit.rest.pulls.requestReviewers({
      ...repo,
      pull_number: prNumber,
      reviewers,
    }),

    octokit.rest.issues.createComment({
      ...repo,
      issue_number: prNumber,
      body,
    }),
  ]);
}

export { approve, askForReview, squashAndMerge };
