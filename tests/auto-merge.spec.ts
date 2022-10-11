import { beforeEach, describe, expect, test, vi } from "vitest";

import autoMerge, { NotDependabotPrError } from "../src/auto-merge";
import * as github from "../src/lib/github";
import { contextExample } from "./context";

vi.mock("../src/lib/github");

describe("#autoMerge", () => {
  const squashAndMergeSpy = vi.spyOn(github, "squashAndMerge");
  const approveSpy = vi.spyOn(github, "approve");

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("Runs in case of Dependabot PR", async () => {
    expect.assertions(3);

    await autoMerge(contextExample);

    expect(approveSpy).toHaveBeenCalledOnce();
    expect(approveSpy).toHaveBeenCalledWith({
      repo: contextExample.repo,
      prNumber: contextExample.payload.pull_request?.number,
    });
    expect(squashAndMergeSpy).toHaveBeenCalledOnce();
  });

  test("Exits if the requester is not Dependabot", async () => {
    expect.assertions(3);

    const ctx = Object.assign(contextExample, { actor: "Test bot" });
    try {
      await autoMerge(ctx);
    } catch (error) {
      expect(error).toBeInstanceOf(NotDependabotPrError);
    }

    expect(approveSpy).toHaveBeenCalledTimes(0);
    expect(squashAndMergeSpy).toHaveBeenCalledTimes(0);
  });
});
