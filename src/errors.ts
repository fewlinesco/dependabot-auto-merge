class UnsupportedFeatureError extends Error {
  constructor() {
    super();
    this.message = "Unsuported feature.";
  }
}

export { UnsupportedFeatureError };
