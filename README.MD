![GitHub tag badge(latest by date)](https://img.shields.io/github/v/tag/fewlinesco/dependabot-auto-merge?label=Latest%20✅) [![Tests badge](https://github.com/fewlinesco/dependabot-auto-merge/actions/workflows/test.yml/badge.svg)](https://github.com/fewlinesco/dependabot-auto-merge/actions/workflows/test.yml) [![Linter badge](https://github.com/fewlinesco/dependabot-auto-merge/actions/workflows/eslint.yaml/badge.svg)](https://github.com/fewlinesco/dependabot-auto-merge/actions/workflows/eslint.yaml)

# Dependabot AutoMerge Github Action

This Github action allows to handle Dependabot pull requests.

Based on dependencies versions, sensitiveness or project preferences, it is possible to automatically review a PR and ask Dependabot to squash and merge upon checks success (tests, deploy, linter...).

💡 Interactions with Dependabot are done through a [Github personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). It means that the action will answer and give commands to dependabot **on the behalf of the token's owner**.

## Contributions and development

📚 For development documentation, read the [Contributing](https://github.com/fewlinesco/dependabot-auto-merge/blob/main/CONTRIBUTING.md) file.

## Usage

In order to add this action to a repository, you need to create a new workflow:

```yaml
# .github/workflows/auto-merge.yaml
name: AutoMerge

on:
  push:
    branches: [main]
  pull_request:
    types: [opened, reopened, synchronize]

jobs:
  auto-merge:
    runs-on: ubuntu-latest

    name: Approve and ask for merge

    # It is advised to add this line in order to totally skip the code execution
    # in case Dependabot is not the requester.
    if: ${{ github.actor == 'dependabot[bot]' }}

    steps:
      - name: 🔬 Auto merge
        uses: fewlinesco/dependabot-auto-merge@vx.x.x # Use the latest version
        with:
          github-token: ${{ secrets.GH_TOKEN }}
```

This basic configuration will allow **any pull request from Dependabot** to be approved and merged.

**💡 Tip**: It is recommended to update your dependencies before adding the action because it can be long, based on the time one PR needs to pass checks and the number of dependencies need to be updated. Keep in mind that for every pull request merged, every remaining one will be rebased and approved again. (e.g: Given 10 outdated dependencies, it would process 45 rebases: `n * (n - 1) / 2` where `n` is the number of pull requests).

### Workflow inputs

#### `github-token`

```yaml
# ...
- name: 🔬 Auto merge
  uses: fewlinesco/dependabot-auto-merge@vx.x.x
  with:
    github-token: ${{ secrets.GH_TOKEN }}
```

The `github-token` input is **required**. It is a Github PAT and therefore allows the Github action to act as a user.
For this Github action, the **required token's scopes are `read:org, repo, workflow, write:discussion`**.

It's also required to **register github token into Dependabot's secrets** on the Repository (*⚙️ settings > secrets > dependabot*).

#### `npm-disallowlist` and `gha-disallowlist`

A list of dependencies on which you want additional control. The syntax is `<dependency-name>[:<limitation>]`:

```yaml
# ...
- name: 🔬 Auto merge
  uses: fewlinesco/dependabot-auto-merge@vx.x.x
  with:
    github-token: ${{ secrets.GH_TOKEN }}
    npm-disallowlist: pkg-a:major pkg-b:minor
    gha-disallowlist: >
      pkg-c:patch
      pkg-d pkg-e*
```

> One line and multiline syntax are allowed.

In this example:
- `pkg-a:major` means major bumps won't be allowed for `pkg-a`. But minors and patches can still be auto merged.
- `pkg-b:minor` means major and minor bumps won't be allowed for `pkg-b`. But patches can still be auto merged.
- `pkg-c:patch` and `pkg-d` is a different syntax for the same thing: no auto merge allowed.
- The usage of `*` at the end like in `pkg-e*` means that every package with a name starting with `pkg-e` will be impacted. It is cumulative with bump level. e.g: we could want to freeze every `@typescript-eslint/something` package on a major version: `@typescript-eslint/*:major`.

#### `reviewers`

```yaml
# ...
- name: 🔬 Auto merge
  uses: fewlinesco/dependabot-auto-merge@vx.x.x
  with:
    github-token: ${{ secrets.GH_TOKEN }}
    reviewers: FirstReviewer SecondReviewer
```

Reviewers **must be valid Github nicknames**. If the auto merge action is not allowed, the PAT will allow to post a message with a ping to reviewers and will ask a review from them.

💡 If you go with this option, we recommend you to remove the reviewers from your Dependabot config file: It would defeat the purpose to only add reviewers if the auto merge is not possible.

## Credits

This project has been inspired by [Ahmad Nassri](https://github.com/ahmadnassri)'s work on [Dependabot Auto Merge](https://github.com/ahmadnassri/action-dependabot-auto-merge).
