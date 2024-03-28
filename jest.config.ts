import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  coverageDirectory: "coverage",


  moduleNameMapper: {
    "^@/components/(.*)$": ["<rootDir>/components/$1"],
    "^@/pages/(.*)$": ["<rootDir>/pages/$1"],
    "^@/app/(.*)$": ["<rootDir>/app/$1"],
    "^@/lib/(.*)$": ["<rootDir>/lib/$1"],
    "^@/styles/(.*)$": ["<rootDir>/styles/$1"]
   }
  
};

export default config;
