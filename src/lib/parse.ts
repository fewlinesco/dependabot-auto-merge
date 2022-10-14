import { WrongInputError } from "~/errors";
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

  throw new ParseError("No name found.");
}

function getRawVersion(title: string, target: "from" | "to"): string {
  const regex =
    /(?<version>(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)/;

  const matches = title.match(new RegExp(`${target} \\D*${regex.source}`));

  if (matches && matches.groups && matches.groups.version) {
    return matches.groups.version;
  }

  throw new ParseError("No version found.");
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
