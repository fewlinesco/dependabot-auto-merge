import * as core from "@actions/core";
import * as github from "@actions/github";

import autoMerge from "./auto-merge";

autoMerge(github.context)
  .then(() => console.log("🤖 - PR Approved and merge requested"))
  .catch((error) => {
    if (error instanceof Error) {
      console.log("🤖 - ", error.message);
      console.log("👉 - ", error.stack);
      core.setFailed(error.message);
    }
  });
