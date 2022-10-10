import * as core from "@actions/core";
import * as github from "@actions/github";

const GITHUB_TOKEN = core.getInput("gh-pat");
const octokit = github.getOctokit(GITHUB_TOKEN);

async function run(): Promise<void> {
  const { pull_request } = github.context.payload;
  if (pull_request) {
    console.log("context", github.context);
    console.log("repo", github.context.repo);

    await octokit.rest.issues.createComment({
      ...github.context.repo,
      issue_number: pull_request.number,
      body: "This message is a test",
    });
  }
}

run();
