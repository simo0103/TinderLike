const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: "./",
});

const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testEnvironment: "jest-environment-jsdom",
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/app/api/**"],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
};

module.exports = createJestConfig(customJestConfig);
