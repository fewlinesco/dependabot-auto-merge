import * as github from "@actions/github";

import autoMerge, { NotDependabotPrError } from "./auto-merge";

autoMerge(github.context)
  .then(() => console.log("🤖 - PR Approved and merge requested"))
  .catch((error) => {
    if (error instanceof NotDependabotPrError) {
      console.log("🤖 - ", error.message);
    } else if (error instanceof Error) {
      console.log("🤖💥 - ", error.message);
      console.log("👉 - ", error.stack);
    }
  });
