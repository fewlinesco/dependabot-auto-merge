import { Context } from "@actions/github/lib/context";
import { beforeEach, describe, expect, test, vi } from "vitest";

import autoMerge, { NotDependabotPrError } from "../src/auto-merge";
import * as github from "../src/lib/github";
import { contextExample } from "./context";

vi.mock("../src/lib/github");

describe("#autoMerge", () => {
  const approveSpy = vi.spyOn(github, "approve");
  const askForReviewSpy = vi.spyOn(github, "askForReview");
  const squashAndMergeSpy = vi.spyOn(github, "squashAndMerge");

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("Exits if the requester is not Dependabot", async () => {
    expect.assertions(4);

    const ctx = Object.assign(contextExample, { actor: "Test bot" });

    try {
      await autoMerge(ctx, "");
    } catch (error) {
      expect(error).toBeInstanceOf(NotDependabotPrError);
    }

    expect(approveSpy).toHaveBeenCalledTimes(0);
    expect(squashAndMergeSpy).toHaveBeenCalledTimes(0);
    expect(askForReviewSpy).toHaveBeenCalledTimes(0);
  });

  test("Proceeds in case of Dependabot PR and no blacklist provided", async () => {
    expect.assertions(3);
    const ctx = Object.assign(contextExample, { actor: "dependabot[bot]" });

    await autoMerge(ctx, "");

    expect(approveSpy).toHaveBeenCalledOnce();
    expect(approveSpy).toHaveBeenCalledWith({
      repo: contextExample.repo,
      prNumber: contextExample.payload.pull_request?.number,
    });
    expect(squashAndMergeSpy).toHaveBeenCalledOnce();
  });

  test("Proceeds in case of Dependabot PR and dependancy is black listed", async () => {
    expect.assertions(3);

    await autoMerge(
      {
        actor: "dependabot[bot]",
        payload: { pull_request: { title: "Bump something/specific from 1.0.0 to 2.0.0", number: 80 } },
      } as unknown as Context,
      "something/specific:patch",
    );

    expect(approveSpy).toHaveBeenCalledTimes(0);
    expect(squashAndMergeSpy).toHaveBeenCalledTimes(0);
    expect(askForReviewSpy).toHaveBeenCalledTimes(1);
  });

  test("Proceeds in case of Dependabot PR and range is black listed", async () => {
    expect.assertions(3);

    await autoMerge(
      {
        actor: "dependabot[bot]",
        payload: { pull_request: { title: "Bump something/specific from 1.0.0 to 2.0.0", number: 80 } },
      } as unknown as Context,
      "something/*:patch",
    );

    expect(approveSpy).toHaveBeenCalledTimes(0);
    expect(squashAndMergeSpy).toHaveBeenCalledTimes(0);
    expect(askForReviewSpy).toHaveBeenCalledTimes(1);
  });
});
