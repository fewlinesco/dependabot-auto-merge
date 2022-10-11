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

async function comment({ repo, prNumber }: ActionPayload): Promise<void> {
  const octokit = getClient();

  await octokit.rest.issues.createComment({
    ...repo,
    issue_number: prNumber,
    body: "@dependabot squash and merge",
  });
}

async function review({ repo, prNumber }: ActionPayload): Promise<void> {
  const octokit = getClient();

  await octokit.rest.pulls.createReview({
    ...repo,
    pull_number: prNumber,
    event: "APPROVE",
  });
}

export { comment, review };