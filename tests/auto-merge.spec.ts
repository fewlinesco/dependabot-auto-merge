import { Context } from "@actions/github/lib/context";
import { beforeEach, describe, expect, test, vi } from "vitest";

import autoMerge from "../src/auto-merge";
import * as github from "../src/lib/github";
import { contextExample } from "./context";

vi.mock("../src/lib/github");

describe("#autoMerge", () => {
  const approveSpy = vi.spyOn(github, "approve");
  const askForReviewSpy = vi.spyOn(github, "askForReview");
  const squashAndMergeSpy = vi.spyOn(github, "squashAndMerge");
  const SUCCESS_MESSAGE = "Automerge process ended.";

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("Skips if the requester is not Dependabot", async () => {
    expect.assertions(5);

    const ctx = Object.assign(contextExample, { actor: "Test bot" });

    const [result, message] = await autoMerge(ctx, "", "");

    expect(result).toBe("NOK");
    expect(message).toBe("💤 Skipping: This is not a Dependabot PR.");
    expect(approveSpy).toHaveBeenCalledTimes(0);
    expect(squashAndMergeSpy).toHaveBeenCalledTimes(0);
    expect(askForReviewSpy).toHaveBeenCalledTimes(0);
  });

  test("Skips in case of no valid versions", async () => {
    expect.assertions(5);

    const [result, message] = await autoMerge(
      {
        actor: "dependabot[bot]",
        payload: {
          pull_request: {
            title: "Bump something/specific from not-a-valid-versioning to not-a-valid-versioning",
            number: 80,
          },
        },
      } as unknown as Context,
      "something/specific:patch",
      "",
    );

    expect(result).toBe("NOK");
    expect(message).toBe("No valid 'version' found in PR title.");
    expect(approveSpy).toHaveBeenCalledTimes(0);
    expect(squashAndMergeSpy).toHaveBeenCalledTimes(0);
    expect(askForReviewSpy).toHaveBeenCalledTimes(1);
  });

  test("Skips in case of not supported feature", async () => {
    expect.assertions(5);

    const [result, message] = await autoMerge(
      {
        actor: "dependabot[bot]",
        payload: {
          pull_request: {
            title: "Bump something/specific from 0.0.1-alpha.1 to 0.0.1",
            number: 80,
          },
        },
      } as unknown as Context,
      "something/specific:patch",
      "",
    );

    expect(result).toBe("NOK");
    expect(message).toBe("Unsupported feature.");
    expect(approveSpy).toHaveBeenCalledTimes(0);
    expect(squashAndMergeSpy).toHaveBeenCalledTimes(0);
    expect(askForReviewSpy).toHaveBeenCalledTimes(1);
  });

  test("Proceeds in case of Dependabot PR and no blacklist provided", async () => {
    expect.assertions(6);
    const ctx = Object.assign(contextExample, { actor: "dependabot[bot]" });

    const [result, message] = await autoMerge(ctx, "", "");

    expect(result).toBe("OK");
    expect(message).toBe(SUCCESS_MESSAGE);
    expect(approveSpy).toHaveBeenCalledOnce();
    expect(approveSpy).toHaveBeenCalledWith({
      repo: contextExample.repo,
      prNumber: contextExample.payload.pull_request?.number,
    });
    expect(squashAndMergeSpy).toHaveBeenCalledOnce();
    expect(askForReviewSpy).toHaveBeenCalledTimes(0);
  });

  test("Proceeds in case of Dependabot PR and dependancy is black listed", async () => {
    expect.assertions(5);

    const [result, message] = await autoMerge(
      {
        actor: "dependabot[bot]",
        payload: { pull_request: { title: "Bump something/specific from 1.0.0 to 2.0.0", number: 80 } },
      } as unknown as Context,
      "something/specific:patch",
      "",
    );
    expect(result).toBe("OK");
    expect(message).toBe(SUCCESS_MESSAGE);
    expect(approveSpy).toHaveBeenCalledTimes(0);
    expect(squashAndMergeSpy).toHaveBeenCalledTimes(0);
    expect(askForReviewSpy).toHaveBeenCalledTimes(1);
  });

  test("Proceeds in case of Dependabot PR and range is black listed", async () => {
    expect.assertions(5);

    const [result, message] = await autoMerge(
      {
        actor: "dependabot[bot]",
        payload: { pull_request: { title: "Bump something/specific from 1.0.0 to 2.0.0", number: 80 } },
      } as unknown as Context,
      "something/*:patch",
      "",
    );
    expect(result).toBe("OK");
    expect(message).toBe(SUCCESS_MESSAGE);
    expect(approveSpy).toHaveBeenCalledTimes(0);
    expect(squashAndMergeSpy).toHaveBeenCalledTimes(0);
    expect(askForReviewSpy).toHaveBeenCalledTimes(1);
  });

  test("Proceeds in case of Dependabot PR and range without target is black listed", async () => {
    expect.assertions(5);

    const [result, message] = await autoMerge(
      {
        actor: "dependabot[bot]",
        payload: { pull_request: { title: "Bump something/specific from 1.0.0 to 2.0.0", number: 80 } },
      } as unknown as Context,
      "something/*",
      "",
    );
    expect(result).toBe("OK");
    expect(message).toBe(SUCCESS_MESSAGE);
    expect(approveSpy).toHaveBeenCalledTimes(0);
    expect(squashAndMergeSpy).toHaveBeenCalledTimes(0);
    expect(askForReviewSpy).toHaveBeenCalledTimes(1);
  });
});
