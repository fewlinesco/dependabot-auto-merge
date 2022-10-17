import * as core from "@actions/core";
import * as github from "@actions/github";

import autoMerge, { NotDependabotPrError } from "./auto-merge";

const rawBlacklist = [core.getInput("npm-blacklist"), core.getInput("gha-blacklist")].filter((item) => item).join(" ");

autoMerge(github.context, rawBlacklist, core.getInput("reviewers") || "")
  .then(([result, message]) => console.log(result === "OK" ? "✅ - " : "🚧 - " + message))
  .catch((error) => {
    if (error instanceof NotDependabotPrError) {
      console.info(error.message);
    } else if (error instanceof Error) {
      console.error("💥 - ", error.message);
      console.error("👉 - ", error.stack);
      throw error;
    }
  });
