module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: [
		'<rootDir>/src',
	],
	testMatch: [
		'**/*.+(ts|tsx|js)',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	collectCoverage: true
};