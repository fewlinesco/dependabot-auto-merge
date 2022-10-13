import semver from "semver";

import { UnsupportedFeatureError } from "~/errors";

class NotValidSemverError extends Error {}

type Version = {
  full: string;
  major: number;
  minor: number;
  patch: number;
};

function diff(from: string, to: string): "major" | "minor" | "patch" {
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

export { get, diff, NotValidSemverError };
