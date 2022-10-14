class UnsupportedFeatureError extends Error {
  constructor() {
    super();
    this.message = "Unsuported feature.";
  }
}

class WrongInputError extends Error {
  constructor(input: string) {
    super();
    this.message = `Wrong '${input}' input.`;
  }
}

export { UnsupportedFeatureError, WrongInputError };
