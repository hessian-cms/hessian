/** @jest-config-loader ts-node */
// or
/** @jest-config-loader esbuild-register */

import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    }
  },
  coveragePathIgnorePatterns: [
    "/dist/",
    "/test/",
    "/node_modules/"
  ],
  transform: {
    ...tsJestTransformCfg,
  },
};

export default config;
