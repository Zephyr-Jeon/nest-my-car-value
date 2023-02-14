import { rm } from 'fs/promises';
import { join } from 'path';

// Define a file that's going to be executed right before all of test suites
// jest-e2e.json > "setupFilesAfterEnv": ["<rootDir>/setup.ts"]
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (e) {}
});
