import { UnsupportedFeatureError, WrongInputError } from "~/errors";
import { AllowedBumps } from "~/types";

class ParseError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

function getName(title: string): string {
  const match = /(bump|update) (?<name>(?:@[^\s]+\/)?[^\s]+) (requirement)?/i.exec(title);

  if (match && match.groups && match.groups.name) {
    return match.groups.name;
  }

  throw new ParseError("No valid dependancy 'name' found in PR title.");
}

function getRawVersion(title: string, target: "from" | "to"): string {
  const regex =
    /(?<version>(?<major>0|[1-9]\d*)(\.(?<minor>(0|[1-9]\d*))(\.(?<patch>(0|[1-9]\d*))(?:-((?<remainder>0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)?)?)/;

  const matches = title.match(new RegExp(`${target} \\D*${regex.source}`));

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

function getBlacklist(rawBlacklist: string): Record<string, AllowedBumps> {
  return rawBlacklist.split(/\s/).reduce((acc, raw) => {
    const [name, limit] = raw.split(":");
    if (!limit || ["major", "minor", "patch"].includes(limit)) {
      return {
        ...acc,
        [name]: limit ?? "patch",
      };
    }
    throw new WrongInputError("blacklist");
  }, {});
}

export { getName, getBlacklist, getRawVersion, ParseError };
