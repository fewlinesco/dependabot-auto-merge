import { describe, expect, test } from "vitest";

import { UnsupportedFeatureError } from "../src/errors";
import { get, diff, NotValidSemverError, isBumpAllowed } from "../src/lib/version";

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
      expect(diff("0.0.0", "0.0.1")).toBe("patch");
      expect(diff("1.0.0", "1.1.1")).toBe("minor");
      expect(diff("1.0.0", "2.1.1")).toBe("major");
      expect(diff("2.0.1", "1.1.1")).toBe("major");

      try {
        diff("0.0.1-alpha.1", "0.0.2-alpha.1");
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedFeatureError);
      }
    });
  });

  describe("#isBumpAllowed", () => {
    test("Denies all bumps when provided with 'patch' and simple dependancy name", () => {
      const bump = {
        dependancy: "deps-name",
        from: get("1.0.0"),
        to: get("2.0.0"),
      };
      const releaseType = diff(bump.from.full, bump.to.full);

      const assertion = isBumpAllowed(bump, releaseType, { "deps-name": "patch" });
      expect(assertion).toBe(false);
    });

    test("Allows patch bumps when provided with 'minor' and simple dependancy name", () => {
      const bump = {
        dependancy: "deps-name",
        from: get("1.0.0"),
        to: get("1.0.1"),
      };
      const releaseType = diff(bump.from.full, bump.to.full);

      const assertion = isBumpAllowed(bump, releaseType, { "deps-name": "minor" });
      expect(assertion).toBe(true);
    });

    test("Allows patch bumps when provided with 'major' and simple dependancy name", () => {
      const bump = {
        dependancy: "deps-name",
        from: get("1.0.0"),
        to: get("1.0.1"),
      };
      const releaseType = diff(bump.from.full, bump.to.full);

      const assertion = isBumpAllowed(bump, releaseType, { "deps-name": "major" });
      expect(assertion).toBe(true);
    });

    test("Allows minor bumps when provided with 'major' and simple dependancy name", () => {
      const bump = {
        dependancy: "deps-name",
        from: get("1.0.0"),
        to: get("1.1.0"),
      };
      const releaseType = diff(bump.from.full, bump.to.full);

      const assertion = isBumpAllowed(bump, releaseType, { "deps-name": "major" });
      expect(assertion).toBe(true);
    });
  });
});
