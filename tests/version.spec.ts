import { describe, expect, test } from "vitest";

import { UnsupportedFeatureError } from "../src/errors";
import { get, diff, NotValidSemverError, isBumpAllowed } from "../src/lib/version";

describe("version", () => {
  describe("#get", () => {
    test("Fails if the provided arugment is not a valid semver", () => {
      expect.assertions(1);

      try {
        get("toto");
      } catch (error) {
        expect(error).toBeInstanceOf(NotValidSemverError);
      }
    });

    test("Fails if version is a prerelease", () => {
      expect.assertions(1);

      try {
        get("0.0.0-alpha.5");
      } catch (error) {
        expect(error).toBeInstanceOf(UnsupportedFeatureError);
      }
    });

    test("Returns the parsed version", () => {
      expect.assertions(4);

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
      expect.assertions(1);

      try {
        diff("unit", "test");
      } catch (error) {
        expect(error).toBeInstanceOf(NotValidSemverError);
      }
    });

    test("Returns the correct release type", () => {
      expect.assertions(8);

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
    describe("With a simple dependancy name", () => {
      test("Denies all bumps when provided with 'patch'", () => {
        expect.assertions(1);

        const bump = {
          dependancy: "deps-name",
          from: get("1.0.0"),
          to: get("2.0.0"),
        };
        const releaseType = diff(bump.from.full, bump.to.full);

        const assertion = isBumpAllowed(bump, releaseType, { "deps-name": "patch" });
        expect(assertion).toBe(false);
      });

      test("Allows patch bumps when provided with 'minor'", () => {
        expect.assertions(1);

        const bump = {
          dependancy: "deps-name",
          from: get("1.0.0"),
          to: get("1.0.1"),
        };
        const releaseType = diff(bump.from.full, bump.to.full);

        const assertion = isBumpAllowed(bump, releaseType, { "deps-name": "minor" });
        expect(assertion).toBe(true);
      });

      test("Allows patch bumps when provided with 'major'", () => {
        expect.assertions(1);

        const bump = {
          dependancy: "deps-name",
          from: get("1.0.0"),
          to: get("1.0.1"),
        };
        const releaseType = diff(bump.from.full, bump.to.full);

        const assertion = isBumpAllowed(bump, releaseType, { "deps-name": "major" });
        expect(assertion).toBe(true);
      });

      test("Allows minor bumps when provided with 'major'", () => {
        expect.assertions(1);

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

    describe("with a range as name", () => {
      expect.assertions(1);

      test("Denies bumps when provided with 'patch'", () => {
        const bump = {
          dependancy: "@something/else",
          from: get("0.0.1"),
          to: get("1.0.0"),
        };
        const releaseType = diff(bump.from.full, bump.to.full);

        const assertion = isBumpAllowed(bump, releaseType, { "@something/*": "patch" });
        expect(assertion).toBe(false);
      });

      test("Denies bumps when provided with same release type", () => {
        expect.assertions(2);

        let bump = {
          dependancy: "@something/else",
          from: get("0.1.0"),
          to: get("0.2.0"),
        };
        let releaseType = diff(bump.from.full, bump.to.full);

        let assertion = isBumpAllowed(bump, releaseType, { "@something/*": "minor" });
        expect(assertion).toBe(false);

        bump = {
          dependancy: "@something/else",
          from: get("1.0.0"),
          to: get("2.0.0"),
        };
        releaseType = diff(bump.from.full, bump.to.full);

        assertion = isBumpAllowed(bump, releaseType, { "@something/*": "major" });
        expect(assertion).toBe(false);
      });

      test("Allows patch bumps when provided with 'minor'", () => {
        expect.assertions(1);

        const bump = {
          dependancy: "@something/else",
          from: get("0.0.1"),
          to: get("0.0.2"),
        };
        const releaseType = diff(bump.from.full, bump.to.full);

        const assertion = isBumpAllowed(bump, releaseType, { "@something/*": "minor" });
        expect(assertion).toBe(true);
      });

      test("Allows patch bumps when provided with 'major'", () => {
        expect.assertions(1);

        const bump = {
          dependancy: "@something/else",
          from: get("1.0.0"),
          to: get("1.0.1"),
        };
        const releaseType = diff(bump.from.full, bump.to.full);

        const assertion = isBumpAllowed(bump, releaseType, { "@something/*": "major" });
        expect(assertion).toBe(true);
      });

      test("Allows minor bumps when provided with 'major'", () => {
        expect.assertions(1);

        const bump = {
          dependancy: "@something/else",
          from: get("1.0.0"),
          to: get("1.1.0"),
        };
        const releaseType = diff(bump.from.full, bump.to.full);

        const assertion = isBumpAllowed(bump, releaseType, { "@something/*": "major" });
        expect(assertion).toBe(true);
      });
    });
  });
});
