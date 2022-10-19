import { describe, expect, test } from "vitest";

import { UnsupportedFeatureError, WrongInputError } from "../src/errors";
import { getBlacklist, getName, getRawVersion, ParseError } from "../src/lib/parse";

describe("parse", () => {
  describe("#getName", () => {
    test("Fails in case of no matching", () => {
      expect.assertions(2);
      try {
        getName("Invalid title");
      } catch (error) {
        expect(error).toBeInstanceOf(ParseError);
        if (error instanceof Error) {
          expect(error.message).toBe("No valid dependency 'name' found in PR title.");
        }
      }
    });

    test("Returns the dependency name", () => {
      expect.assertions(2);
      const depsName = "deps-name";
      const name = getName(`Bump ${depsName} from 0.0.1 to 0.0.2`);

      expect(typeof name).toBe("string");
      expect(name).toBe(depsName);
    });
  });

  describe("#getRawVersion", () => {
    test("Returns the right versions from title", () => {
      expect.assertions(4);

      const source = "0.0.1";
      const target = "0.0.2";
      const from = getRawVersion(`Bump deps-name from ${source} to ${target}`, "from");
      const to = getRawVersion(`Bump deps-name from ${source} to ${target}`, "to");

      expect(typeof from).toBe("string");
      expect(from).toBe(source);

      expect(typeof to).toBe("string");
      expect(to).toBe(target);
    });

    test("Rounds incomplete numeric versions to semver", () => {
      expect.assertions(4);

      expect(getRawVersion("Bump fake/package from 5 to 1", "from")).toBe("5.0.0");
      expect(getRawVersion("Bump fake/package from 5 to 1", "to")).toBe("1.0.0");
      expect(getRawVersion("Bump fake/package from 5.2 to 1", "from")).toBe("5.2.0");
      expect(getRawVersion("Bump fake/package from 5 to 1.2", "to")).toBe("1.2.0");
    });

    test("Throws UnsupportedFeatureError for pre-releases ", () => {
      expect.assertions(1);

      try {
        getRawVersion("Bump fake/package from 0.0.1-alpha.1 to 0.0.2", "from");
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedFeatureError);
      }
    });
  });

  describe("#getBlackList", () => {
    test("Throws when provided with wrong input", () => {
      expect.assertions(2);

      const deps = ["fake-one:fake"];
      try {
        getBlacklist(deps.join(" "));
      } catch (error) {
        expect(error).toBeInstanceOf(WrongInputError);
        if (error instanceof Error) {
          expect(error.message).toBe("Wrong 'blacklist' input.");
        }
      }
    });

    test("Parses irregarless of the spaces between deps", () => {
      const deps = ["fake-one:major", "fake-2:minor", "fake-3:patch"];
      const expected = { "fake-one": "major", "fake-2": "minor", "fake-3": "patch" };

      expect(getBlacklist(deps.join(" "))).toMatchObject(expected);
      expect(getBlacklist(deps.join("\n"))).toMatchObject(expected);
      expect(getBlacklist(deps.join("        "))).toMatchObject(expected);
      expect(
        getBlacklist(
          deps.join(`
          `),
        ),
      ).toMatchObject(expected);
    });

    test("Parses a row black list", () => {
      const deps = ["fake-one:major", "fake-2:minor", "fake-3:patch"];
      const parsed = getBlacklist(deps.join(" "));
      expect(parsed).toMatchObject({ "fake-one": "major", "fake-2": "minor", "fake-3": "patch" });
    });

    test("Considers the absence of limit as 'patch'", () => {
      const deps = ["fake"];
      const parsed = getBlacklist(deps.join(" "));
      expect(parsed).toMatchObject({ fake: "patch" });
    });
  });
});
