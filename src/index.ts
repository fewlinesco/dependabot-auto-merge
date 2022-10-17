import * as core from "@actions/core";
import * as github from "@actions/github";

import autoMerge, { NotDependabotPrError } from "./auto-merge";

autoMerge(github.context, core.getInput("blacklist") || "")
  .then((output) => console.log(output))
  .catch((error) => {
    if (error instanceof NotDependabotPrError) {
      console.info(error.message);
    } else if (error instanceof Error) {
      console.error("💥 - ", error.message);
      console.error("👉 - ", error.stack);
      throw error;
    }
  });
