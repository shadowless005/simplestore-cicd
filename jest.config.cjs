module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/test/polyfills.cjs"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
};
