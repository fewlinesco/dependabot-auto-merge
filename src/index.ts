import * as core from "@actions/core";
import * as github from "@actions/github";

import autoMerge, { NotDependabotPrError } from "./auto-merge";

autoMerge(github.context, core.getInput("blacklist") || "")
  .then(() => console.log("🤖 - PR Approved and merge requested"))
  .catch((error) => {
    if (error instanceof NotDependabotPrError) {
      console.log("🤖 - Not a Dependabot PR.");
    } else if (error instanceof Error) {
      console.log("💥 - ", error.message);
      console.log("👉 - ", error.stack);
    }
  });
