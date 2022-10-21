type AllowedBumps = "major" | "minor" | "patch";

type Bump = {
  dependency: string;
  from: Version;
  to: Version;
};

type Version = {
  full: string;
  major: number;
  minor: number;
  patch: number;
};

export type { AllowedBumps, Bump, Version };
