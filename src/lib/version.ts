import semver from "semver";

import { NotValidSemverError, UnsupportedFeatureError } from "~/errors";
import { AllowedBumps, Bump, Version } from "~/types";

function diff(from: string, to: string): AllowedBumps {
  let releaseType;

  try {
    releaseType = semver.diff(from, to);
  } catch (error) {
    if (error instanceof TypeError) {
      releaseType = null;
    } else {
      throw error;
    }
  }

  switch (releaseType) {
    case "premajor":
    case "preminor":
    case "prepatch":
    case "prerelease":
      throw new UnsupportedFeatureError();
    case undefined:
    case null:
      throw new NotValidSemverError();
    default:
      return releaseType;
  }
}

function get(text: string): Version {
  if (!semver.valid(text)) {
    throw new NotValidSemverError();
  } else if (semver.prerelease(text)) {
    throw new UnsupportedFeatureError();
  } else {
    return {
      full: text,
      major: semver.major(text),
      minor: semver.minor(text),
      patch: semver.patch(text),
    };
  }
}

function isBumpAllowed(bump: Bump, releaseType: AllowedBumps, blacklist: Record<string, AllowedBumps>): boolean {
  const weights = {
    major: 1,
    minor: 2,
    patch: 3,
  };

  let blocked: AllowedBumps | undefined = blacklist[bump.dependancy];

  const blacklistNames = Object.keys(blacklist);
  if (!blocked && blacklistNames.length > 0) {
    blacklistNames.forEach((name) => {
      if (name.endsWith("*") && bump.dependancy.startsWith(name.replace("*", ""))) {
        blocked = blacklist[name];
      }
    });
  }

  return blocked ? weights[releaseType] > weights[blocked] : true;
}

export { get, diff, isBumpAllowed };
