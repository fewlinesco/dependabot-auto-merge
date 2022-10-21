class NotDependabotPrError extends Error {
  constructor() {
    super();
    this.message = "💤 Skipping: This is not a Dependabot PR.";
  }
}

class NotValidSemverError extends Error {}

class ParseError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
class ReviewAlreadyPendingError extends Error {
  constructor(reviewers: string[]) {
    super();
    this.message = ["A review has already been requested to:", ...reviewers].join("\n-");
  }
}

class UnsupportedFeatureError extends Error {
  constructor() {
    super();
    this.message = "Unsupported feature.";
  }
}

class WrongInputError extends Error {
  constructor(input: string) {
    super();
    this.message = `Wrong '${input}' input.`;
  }
}

export {
  NotDependabotPrError,
  NotValidSemverError,
  ParseError,
  ReviewAlreadyPendingError,
  UnsupportedFeatureError,
  WrongInputError,
};
