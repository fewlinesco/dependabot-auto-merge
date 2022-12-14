import { ParseError, UnsupportedFeatureError, WrongInputError } from "~/errors";
import { AllowedBumps } from "~/types";

function getName(title: string): string {
  const match = /(bump|update) (?<name>(?:@[^\s]+\/)?[^\s]+) (requirement)?/i.exec(title);

  if (match && match.groups && match.groups.name) {
    return match.groups.name;
  }

  throw new ParseError("No valid dependency 'name' found in PR title.");
}

function getRawVersion(title: string, target: "from" | "to"): string {
  /**
   * - `major`, `minor` and `patch` can be numbers, from 0 to (basically) infinite
   * - the whole result grouped under `version`.
   * - `major` is mandatory
   * - `minor` is optional but...
   * - mandatory if `patch` is present
   * - `patch` is optional but...
   * - mandatory if `remainder` is present
   * - `remainder` is optional atm because we just don't support automerge for something that would be in prerelease like `1.1.1-alpha.1`. For now, it's only used as kind of security. If `patch && !remainder` we handle it, if `patch && remainder` -> `UnsupportedError`
   *
   * Here are some examples: https://regex101.com/r/q60Toz/2
   */
  const regex =
    /(?<version>(?<major>0|[1-9]\d*)(\.(?<minor>(0|[1-9]\d*))(\.(?<patch>(0|[1-9]\d*))(?:-((?<remainder>0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)?)?)/;

  const matches = title.match(new RegExp(` ${target} \\D*${regex.source}`));

  if (matches && matches.groups && matches.groups.version && matches.groups.major) {
    if (matches.groups.remainder) {
      throw new UnsupportedFeatureError();
    } else if (matches.groups.patch) {
      return matches.groups.version;
    } else if (!matches.groups.minor && !matches.groups.patch) {
      return `${matches.groups.major}.0.0`;
    } else if (matches.groups.minor && !matches.groups.patch) {
      return `${matches.groups.major}.${matches.groups.minor}.0`;
    }
  }

  throw new ParseError("No valid 'version' found in PR title.");
}

function getDisallowList(rawDisallowList: string): Record<string, AllowedBumps> {
  return rawDisallowList.split(/\s/).reduce((acc, raw) => {
    const [name, limit] = raw.split(":");
    if (!limit || ["major", "minor", "patch"].includes(limit)) {
      return {
        ...acc,
        [name]: limit ?? "patch",
      };
    }
    throw new WrongInputError("disallowlist");
  }, {});
}

export { getName, getDisallowList, getRawVersion, ParseError };
