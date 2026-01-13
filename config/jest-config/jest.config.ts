/** @jest-config-loader ts-node */
// or
/** @jest-config-loader esbuild-register */

import { createDefaultPreset } from "ts-jest";
import type { Config } from "jest";

const tsJestTransformCfg = createDefaultPreset().transform;

const JestConfig: Config = {
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    }
  },
  transform: {
    ...tsJestTransformCfg,
  },
}

export default JestConfig;