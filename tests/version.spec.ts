import { describe, expect, test } from "vitest";

import { UnsupportedFeatureError } from "../src/errors";
import { get, diff, NotValidSemverError } from "../src/lib/version";

describe("version", () => {
  describe("#get", () => {
    test("Fails if the provided arugment is not a valid semver", () => {
      try {
        get("toto");
      } catch (error) {
        expect(error).toBeInstanceOf(NotValidSemverError);
      }
    });

    test("Fails if version is a prerelease", () => {
      try {
        get("0.0.0-alpha.5");
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedFeatureError);
      }
    });

    test("Returns the parsed version", () => {
      const dependancyVersion = "1.2.3";
      const v = get(dependancyVersion);
      expect(v.full).toBe(dependancyVersion);
      expect(v.major).toBe(Number(dependancyVersion.split(".")[0]));
      expect(v.minor).toBe(Number(dependancyVersion.split(".")[1]));
      expect(v.patch).toBe(Number(dependancyVersion.split(".")[2]));
    });
  });

  describe("#diff", () => {
    test("Fails if the provided text is not a valid semver", () => {
      try {
        diff("unit", "test");
      } catch (error) {
        expect(error).toBeInstanceOf(NotValidSemverError);
      }
    });

    test("Returns the correct release type", () => {
      expect(diff("1.0.0", "0.0.0")).toBe("major");
      expect(diff("0.1.0", "0.0.0")).toBe("minor");
      expect(diff("0.0.1", "0.0.0")).toBe("patch");

      try {
        diff("0.0.1-alpha.1", "0.0.2-alpha.1");
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedFeatureError);
      }
    });
  });
});
