# Dependabot AutoMerge Github Action

This Github action allows to handle Dependabot pull requests.

Based on dependancies versions, sensitiveness or project preferences, it is possible to automatically review a PR and ask Dependabot to squash and merge upon checks success (tests, deploy, linter...).

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
        uses: fewlinesco/dependabot-auto-merge
        with:
          github-token: ${{ secrets.GH_TOKEN }}
```

This basic configuration will allow **any pull request from Dependabot** to be approved and merged.

### Workflow inputs

We already seen the `github-token` input, which is **required**.

You can provide additional options to have more control aver the action:

#### `npm-blacklist` and `gha-blacklist`

A list of dependancies on which you want additional control. The syntax is `<dependancy-name>[:<limitation>]`:


```yaml
# ...
- name: 🔬 Auto merge
  uses: fewlinesco/dependabot-auto-merge
  with:
    github-token: ${{ secrets.GH_TOKEN }}
    npm-blacklist: pkg-a:major pkg-b:minor
    gha-blacklist: >
      pkg-c:patch
      pkg-d pkg-e*"
```

> one line and multine syntaxes are allowed.

In this example:
- `pkg-a:major` means major bumps won't be allowed for `pkk-a`. But minors and patches can still be auto merged.
- `pkg-b:minor` means major and minor bumps won't be allowed for `pkk-a`. But patches can still be auto merged.
- `pkg-c:patch` and `pkg-d` is a different syntax for the same thing: no auto merge allowed.
- `pkg-e*` means that every package with a name starting with `pkg-e` will be impacted. It is cumulative with bump level. e.g: we could want to freeze every `"@typescript-eslint` on a major version: `"@typescript-eslint/*:major`.

#### `reviewers`


```yaml
# ...
- name: 🔬 Auto merge
  uses: fewlinesco/dependabot-auto-merge
  with:
    github-token: ${{ secrets.GH_TOKEN }}
    reviewers: FirstReviewer SecondReviewer
```

Reviewers **must be valid Github nicknames"**. If the auto merge action is not allowed, the PAT will allow to post a message with a ping to reviewers and will ask a review from them.

💡 If you go with this option, we recommend you to remove the reviwers from your Dependabot config file: It would defeat the purpose to only add reviwers if the auto merge is not possible.
