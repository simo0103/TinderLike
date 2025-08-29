module.exports = {
	testEnvironment: "jest-environment-jsdom",
	testPathIgnorePatterns: ["/node_modules/"],
	collectCoverage: true,
	coverageDirectory: "coverage",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	bail: true,
	testMatch: ["<rootDir>/src/**/*.test.(js|jsx|ts|tsx)"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
};
