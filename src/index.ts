import * as core from "@actions/core";
import * as github from "@actions/github";

import autoMerge, { NotDependabotPrError } from "./auto-merge";

const rawDisallowList = [core.getInput("npm-disallowlist"), core.getInput("gha-disallowlist")].filter((item) => item).join(" ");

autoMerge(github.context, rawDisallowList, core.getInput("reviewers") || "")
  .then(([result, message]) => console.log(result === "OK" ? "✅ - " : "🚧 - " + message))
  .catch((error) => {
    if (error instanceof NotDependabotPrError) {
      console.log(error.message);
    } else if (error instanceof Error) {
      console.error("💥 - ", error.message);
      console.error("👉 - ", error.stack);
      throw error;
    }
  });
