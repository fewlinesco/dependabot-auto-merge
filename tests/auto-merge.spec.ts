import { beforeEach, describe, expect, test, vi } from "vitest";

import autoMerge, { NotDependabotPrError } from "../src/auto-merge";
import * as github from "../src/lib/github";
import { contextExample } from "./context";

vi.mock("../src/lib/github", () => ({
  comment: async () => undefined,
  review: async () => undefined,
}));

describe("#autoMerge", () => {
  const commentSpy = vi.spyOn(github, "comment");
  const reviewSpy = vi.spyOn(github, "review");

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("Runs in case of Dependabot PR", async () => {
    expect.assertions(3);

    await autoMerge(contextExample);

    expect(reviewSpy).toHaveBeenCalledOnce();
    expect(reviewSpy).toHaveBeenCalledWith({
      repo: contextExample.repo,
      prNumber: contextExample.payload.pull_request?.number,
    });
    expect(commentSpy).toHaveBeenCalledOnce();
  });

  test("Exits if the requester is not Dependabot", async () => {
    expect.assertions(3);

    const ctx = Object.assign(contextExample, { actor: "Test bot" });
    try {
      await autoMerge(ctx);
    } catch (error) {
      expect(error).toBeInstanceOf(NotDependabotPrError);
    }

    expect(reviewSpy).toHaveBeenCalledTimes(0);
    expect(commentSpy).toHaveBeenCalledTimes(0);
  });
});
