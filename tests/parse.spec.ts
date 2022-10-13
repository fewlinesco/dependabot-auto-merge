import { describe, expect, test } from "vitest";

import { getName, getRawVersion, ParseError } from "../src/lib/parse";

describe("parse", () => {
  describe("#getName", () => {
    test("Fails in case of no matching", () => {
      expect.assertions(2);
      try {
        getName("Invalid title");
      } catch (error) {
        expect(error).toBeInstanceOf(ParseError);
        if (error instanceof Error) {
          expect(error.message).toBe("No name found.");
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
  });
});
