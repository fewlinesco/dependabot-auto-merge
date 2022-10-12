import { Context } from "@actions/github/lib/context";

export const contextExample: Context = {
  issue: { owner: "fewlinesco", repo: "fake-auto-merge", number: 70 },
  repo: { owner: "fewlinesco", repo: "fake-auto-merge" },
  payload: {
    action: "opened",
    number: 70,
    organization: {
      avatar_url: "https://avatars.githubusercontent.com/u/16700502?v=4",
      description:
        "We build developer-friendly commerce APIs for modern Online & Offline commerce. We 😻 Elixir, TypeScript, Go and do everything the Cloud Native way with K8s.",
      events_url: "https://api.github.com/orgs/fewlinesco/events",
      hooks_url: "https://api.github.com/orgs/fewlinesco/hooks",
      id: 16700502,
      issues_url: "https://api.github.com/orgs/fewlinesco/issues",
      login: "fewlinesco",
      members_url: "https://api.github.com/orgs/fewlinesco/members{/member}",
      node_id: "MDEyOk9yZ2FuaXphdGlvbjE2NzAwNTAy",
      public_members_url: "https://api.github.com/orgs/fewlinesco/public_members{/member}",
      repos_url: "https://api.github.com/orgs/fewlinesco/repos",
      url: "https://api.github.com/orgs/fewlinesco",
    },
    pull_request: {
      active_lock_reason: null,
      additions: 57,
      assignee: null,
      assignees: [],
      author_association: "NONE",
      auto_merge: null,
      base: [Object],
      body:
        "Bumps [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin) from 5.39.0 to 5.40.0.\n" +
        "<details>\n" +
        "<summary>Release notes</summary>\n" +
        `<p><em>Sourced from <a href="https://github.com/typescript-eslint/typescript-eslint/releases"><code>@typescript-eslint/eslint-plugin</code>'s releases</a>.</em></p>\n` +
        "<blockquote>\n" +
        "<h2>v5.40.0</h2>\n" +
        '<h1><a href="https://github.com/typescript-eslint/typescript-eslint/compare/v5.39.0...v5.40.0">5.40.0</a> (2022-10-10)</h1>\n' +
        "<h3>Bug Fixes</h3>\n" +
        "<ul>\n" +
        '<li><strong>eslint-plugin:</strong> [consistent-indexed-object-style] handle interface generic (<a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/5746">#5746</a>) (<a href="https://github.com/typescript-eslint/typescript-eslint/commit/7a8a0a3c500ca726d2ab3bee0ae9f3fb9d8d39b8">7a8a0a3</a>)</li>\n' +
        '<li><strong>eslint-plugin:</strong> [no-unnecessary-condition] handle void (<a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/5766">#5766</a>) (<a href="https://github.com/typescript-eslint/typescript-eslint/commit/ac8f06b68dca7666bfb78fb38d6ccc07f676e435">ac8f06b</a>)</li>\n' +
        "</ul>\n" +
        "<h3>Features</h3>\n" +
        "<ul>\n" +
        `<li><strong>eslint-plugin:</strong> Check 'rest' parameters in no-misused-promises (<a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/5731">#5731</a>) (<a href="https://github.com/typescript-eslint/typescript-eslint/commit/6477f3855627cc257edc021b859711d4a5847a12">6477f38</a>), closes <a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/4015">#4015</a></li>\n` +
        '<li><strong>utils:</strong> add dependency constraint filtering for <code>RuleTester</code> (<a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/5750">#5750</a>) (<a href="https://github.com/typescript-eslint/typescript-eslint/commit/121f4c0e7252def95d917e4734e933e53e29d501">121f4c0</a>)</li>\n' +
        `<li><strong>website:</strong> store options TypeScript, Enable jsx and AST Viewer in browser's local storage (<a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/5769">#5769</a>) (<a href="https://github.com/typescript-eslint/typescript-eslint/commit/77d2336594ca10b47c0f7978ae64f87d24a25d33">77d2336</a>)</li>\n` +
        "</ul>\n" +
        "</blockquote>\n" +
        "</details>\n" +
        "<details>\n" +
        "<summary>Changelog</summary>\n" +
        `<p><em>Sourced from <a href="https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/CHANGELOG.md"><code>@typescript-eslint/eslint-plugin</code>'s changelog</a>.</em></p>\n` +
        "<blockquote>\n" +
        '<h1><a href="https://github.com/typescript-eslint/typescript-eslint/compare/v5.39.0...v5.40.0">5.40.0</a> (2022-10-10)</h1>\n' +
        "<h3>Bug Fixes</h3>\n" +
        "<ul>\n" +
        '<li><strong>eslint-plugin:</strong> [consistent-indexed-object-style] handle interface generic (<a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/5746">#5746</a>) (<a href="https://github.com/typescript-eslint/typescript-eslint/commit/7a8a0a3c500ca726d2ab3bee0ae9f3fb9d8d39b8">7a8a0a3</a>)</li>\n' +
        '<li><strong>eslint-plugin:</strong> [no-unnecessary-condition] handle void (<a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/5766">#5766</a>) (<a href="https://github.com/typescript-eslint/typescript-eslint/commit/ac8f06b68dca7666bfb78fb38d6ccc07f676e435">ac8f06b</a>)</li>\n' +
        "</ul>\n" +
        "<h3>Features</h3>\n" +
        "<ul>\n" +
        `<li><strong>eslint-plugin:</strong> Check 'rest' parameters in no-misused-promises (<a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/5731">#5731</a>) (<a href="https://github.com/typescript-eslint/typescript-eslint/commit/6477f3855627cc257edc021b859711d4a5847a12">6477f38</a>), closes <a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/4015">#4015</a></li>\n` +
        '<li><strong>utils:</strong> add dependency constraint filtering for <code>RuleTester</code> (<a href="https://github-redirect.dependabot.com/typescript-eslint/typescript-eslint/issues/5750">#5750</a>) (<a href="https://github.com/typescript-eslint/typescript-eslint/commit/121f4c0e7252def95d917e4734e933e53e29d501">121f4c0</a>)</li>\n' +
        "</ul>\n" +
        "</blockquote>\n" +
        "</details>\n" +
        "<details>\n" +
        "<summary>Commits</summary>\n" +
        "<ul>\n" +
        '<li><a href="https://github.com/typescript-eslint/typescript-eslint/commit/6ac0aa7ef4506031687b92240f5cbdd13f568917"><code>6ac0aa7</code></a> chore: publish v5.40.0</li>\n' +
        '<li><a href="https://github.com/typescript-eslint/typescript-eslint/commit/121f4c0e7252def95d917e4734e933e53e29d501"><code>121f4c0</code></a> feat(utils): add dependency constraint filtering for <code>RuleTester</code> (<a href="https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin/issues/5750">#5750</a>)</li>\n' +
        `<li><a href="https://github.com/typescript-eslint/typescript-eslint/commit/6477f3855627cc257edc021b859711d4a5847a12"><code>6477f38</code></a> feat(eslint-plugin): Check 'rest' parameters in no-misused-promises (<a href="https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin/issues/5731">#5731</a>)</li>\n` +
        '<li><a href="https://github.com/typescript-eslint/typescript-eslint/commit/ac8f06b68dca7666bfb78fb38d6ccc07f676e435"><code>ac8f06b</code></a> fix(eslint-plugin): [no-unnecessary-condition] handle void (<a href="https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin/issues/5766">#5766</a>)</li>\n' +
        '<li><a href="https://github.com/typescript-eslint/typescript-eslint/commit/7a8a0a3c500ca726d2ab3bee0ae9f3fb9d8d39b8"><code>7a8a0a3</code></a> fix(eslint-plugin): [consistent-indexed-object-style] handle interface generi...</li>\n' +
        '<li><a href="https://github.com/typescript-eslint/typescript-eslint/commit/f373fac1dd0150273d98cee5bed606bbd3f55e4b"><code>f373fac</code></a> chore(eslint-plugin): enhance many rule descriptions (<a href="https://github.com/typescript-eslint/typescript-eslint/tree/HEAD/packages/eslint-plugin/issues/5696">#5696</a>)</li>\n' +
        '<li><a href="https://github.com/typescript-eslint/typescript-eslint/commit/2d1e0347543215b7dfda82c82e4c13289ba0947e"><code>2d1e034</code></a> chore(eslint-plugin): comma-spacing meta.type should be layout, not suggestio...</li>\n' +
        '<li>See full diff in <a href="https://github.com/typescript-eslint/typescript-eslint/commits/v5.40.0/packages/eslint-plugin">compare view</a></li>\n' +
        "</ul>\n" +
        "</details>\n" +
        "<br />\n" +
        "\n" +
        "\n" +
        "[![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=@typescript-eslint/eslint-plugin&package-manager=npm_and_yarn&previous-version=5.39.0&new-version=5.40.0)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)\n" +
        "\n" +
        "Dependabot will resolve any conflicts with this PR as long as you don't alter it yourself. You can also trigger a rebase manually by commenting `@dependabot rebase`.\n" +
        "\n" +
        "[//]: # (dependabot-automerge-start)\n" +
        "[//]: # (dependabot-automerge-end)\n" +
        "\n" +
        "---\n" +
        "\n" +
        "<details>\n" +
        "<summary>Dependabot commands and options</summary>\n" +
        "<br />\n" +
        "\n" +
        "You can trigger Dependabot actions by commenting on this PR:\n" +
        "- `@dependabot rebase` will rebase this PR\n" +
        "- `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it\n" +
        "- `@dependabot merge` will merge this PR after your CI passes on it\n" +
        "- `@dependabot squash and merge` will squash and merge this PR after your CI passes on it\n" +
        "- `@dependabot cancel merge` will cancel a previously requested merge and block automerging\n" +
        "- `@dependabot reopen` will reopen this PR if it is closed\n" +
        "- `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually\n" +
        "- `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)\n" +
        "- `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)\n" +
        "- `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)\n" +
        "\n" +
        "\n" +
        "</details>",
      changed_files: 2,
      closed_at: null,
      comments: 0,
      comments_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/issues/70/comments",
      commits: 1,
      commits_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/pulls/70/commits",
      created_at: "2022-10-11T07:58:00Z",
      deletions: 22,
      diff_url: "https://github.com/fewlinesco/fake-auto-merge/pull/70.diff",
      draft: false,
      html_url: "https://github.com/fewlinesco/fake-auto-merge/pull/70",
      id: 1082909636,
      issue_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/issues/70",
      labels: [],
      locked: false,
      maintainer_can_modify: false,
      merge_commit_sha: null,
      mergeable: null,
      mergeable_state: "unknown",
      merged: false,
      merged_at: null,
      merged_by: null,
      milestone: null,
      node_id: "PR_kwDOIC4qQs5Ai-PE",
      number: 70,
      patch_url: "https://github.com/fewlinesco/fake-auto-merge/pull/70.patch",
      rebaseable: null,
      requested_reviewers: [],
      requested_teams: [],
      review_comment_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/pulls/comments{/number}",
      review_comments: 0,
      review_comments_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/pulls/70/comments",
      state: "open",
      statuses_url:
        "https://api.github.com/repos/fewlinesco/fake-auto-merge/statuses/879c6f00f0995b6ce6e1e81d2ba41c747a2b1640",
      title: "Bump @typescript-eslint/eslint-plugin from 5.39.0 to 5.40.0",
      url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/pulls/70",
      user: [Object],
    },
    repository: {
      allow_forking: false,
      archive_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/{archive_format}{/ref}",
      archived: false,
      assignees_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/assignees{/user}",
      blobs_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/git/blobs{/sha}",
      branches_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/branches{/branch}",
      clone_url: "https://github.com/fewlinesco/fake-auto-merge.git",
      collaborators_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/collaborators{/collaborator}",
      comments_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/comments{/number}",
      commits_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/commits{/sha}",
      compare_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/compare/{base}...{head}",
      contents_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/contents/{+path}",
      contributors_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/contributors",
      created_at: "2022-09-22T09:17:12Z",
      default_branch: "main",
      deployments_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/deployments",
      description: null,
      disabled: false,
      downloads_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/downloads",
      events_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/events",
      fork: false,
      forks: 0,
      forks_count: 0,
      forks_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/forks",
      full_name: "fewlinesco/fake-auto-merge",
      git_commits_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/git/commits{/sha}",
      git_refs_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/git/refs{/sha}",
      git_tags_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/git/tags{/sha}",
      git_url: "git://github.com/fewlinesco/fake-auto-merge.git",
      has_downloads: true,
      has_issues: true,
      has_pages: false,
      has_projects: false,
      has_wiki: true,
      homepage: null,
      hooks_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/hooks",
      html_url: "https://github.com/fewlinesco/fake-auto-merge",
      id: 539896386,
      is_template: false,
      issue_comment_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/issues/comments{/number}",
      issue_events_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/issues/events{/number}",
      issues_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/issues{/number}",
      keys_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/keys{/key_id}",
      labels_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/labels{/name}",
      language: "JavaScript",
      languages_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/languages",
      license: [Object],
      merges_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/merges",
      milestones_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/milestones{/number}",
      mirror_url: null,
      name: "fake-auto-merge",
      node_id: "R_kgDOIC4qQg",
      notifications_url:
        "https://api.github.com/repos/fewlinesco/fake-auto-merge/notifications{?since,all,participating}",
      open_issues: 4,
      open_issues_count: 4,
      owner: { login: "Dependabot" },
      private: true,
      pulls_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/pulls{/number}",
      releases_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/releases{/id}",
      size: 265,
      ssh_url: "git@github.com:fewlinesco/fake-auto-merge.git",
      stargazers_count: 0,
      stargazers_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/stargazers",
      statuses_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/statuses/{sha}",
      subscribers_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/subscribers",
      subscription_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/subscription",
      svn_url: "https://github.com/fewlinesco/fake-auto-merge",
      tags_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/tags",
      teams_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/teams",
      topics: [],
      trees_url: "https://api.github.com/repos/fewlinesco/fake-auto-merge/git/trees{/sha}",
      updated_at: "2022-10-10T15:17:53Z",
      url: "https://api.github.com/repos/fewlinesco/fake-auto-merge",
      visibility: "private",
      watchers: 0,
      watchers_count: 0,
      web_commit_signoff_required: false,
    },
    sender: {
      avatar_url: "https://avatars.githubusercontent.com/in/29110?v=4",
      events_url: "https://api.github.com/users/dependabot%5Bbot%5D/events{/privacy}",
      followers_url: "https://api.github.com/users/dependabot%5Bbot%5D/followers",
      following_url: "https://api.github.com/users/dependabot%5Bbot%5D/following{/other_user}",
      gists_url: "https://api.github.com/users/dependabot%5Bbot%5D/gists{/gist_id}",
      gravatar_id: "",
      html_url: "https://github.com/apps/dependabot",
      id: 49699333,
      login: "dependabot[bot]",
      node_id: "MDM6Qm90NDk2OTkzMzM=",
      organizations_url: "https://api.github.com/users/dependabot%5Bbot%5D/orgs",
      received_events_url: "https://api.github.com/users/dependabot%5Bbot%5D/received_events",
      repos_url: "https://api.github.com/users/dependabot%5Bbot%5D/repos",
      site_admin: false,
      starred_url: "https://api.github.com/users/dependabot%5Bbot%5D/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/dependabot%5Bbot%5D/subscriptions",
      type: "Bot",
      url: "https://api.github.com/users/dependabot%5Bbot%5D",
    },
  },
  eventName: "pull_request",
  sha: "b32eb851ee2abbf5883ba54d8d288ebe3bd90791",
  ref: "refs/pull/70/merge",
  workflow: "AutoMerge 💥",
  action: "automerge",
  actor: "dependabot[bot]",
  job: "Fake job",
  runNumber: 21,
  runId: 3225087564,
  apiUrl: "https://api.github.com",
  serverUrl: "https://github.com",
  graphqlUrl: "https://api.github.com/graphql",
};
