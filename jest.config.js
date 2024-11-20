const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
    testEnvironment: 'jest-environment-jsdom',
    moduleDirectories: ['node_modules', '<rootDir>/app'],
    modulePathIgnorePatterns: ['test/e2e'],
    moduleNameMapper: {
        // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
        '^uuid$': require.resolve('uuid'),
        // Map '@/' to the matching directory
        '^@/(.*)$': '<rootDir>/$1',
        // Mock css modules when testing
        // '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: [
        '<rootDir>/middleware.(t|j)s',
        '<rootDir>/app/**/*.(t|j)s',
        '<rootDir>/app/**/*.(t|j)sx',
        '<rootDir>/lib/**/*.(t|j)s',
        '!<rootDir>/app/fixtures/**',
        '!<rootDir>/app/**/*.stories.(t|j)sx',
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/.next',
        '<rootDir>/app/fixtures',
        '<rootDir>/node_modules',
        '<rootDir>/lib/graphql/generated',
        '<rootDir>/lib/createAppSlice.ts',
        '<rootDir>/lib/intl',
        'layout.tsx',
        '<rootDir>/lib/featureflag/flags.ts',
    ],
    coverageThreshold: {
        global: {
            lines: 80,
            statements: 80,
            branches: 80,
            functions: 80,
        },
        './app/**/*.ts': {
            statements: 70,
            branches: 70,
            functions: 70,
            lines: 70,
        },
        './app/**/*.tsx': {
            statements: 70,
            branches: 70,
            functions: 70,
            lines: 70,
        },
        './lib/**/*.ts': {
            statements: 70,
            branches: 50, // TODO fix otel tests above 50%
            functions: 70,
            lines: 70,
        },
    },
    setupFiles: [],
    setupFilesAfterEnv: ['<rootDir>/test/setup/global-jest-setup.ts'],
    testPathIgnorePatterns: [
        '<rootDir>/.next',
        '<rootDir>/node_modules',
        '<rootDir>/coverage',
        '<rootDir>/dist',
        '<rootDir>/lib/intl',
    ],
    transform: {
        '^.+\\.(js|jsx|ts|tsx|css|scss|svg)?$': [
            'ts-jest',
            {
                tsconfig: {
                    jsx: 'react-jsx',
                },
            },
        ],
    },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// crypto-hash will give us SyntaxError: Unexpected token 'export'
// To which the fix is add it to transformIgnorePatterns
// next/jest doesn't allow us to override transformIgnorePatterns in the config
// we have to do it this way
// https://github.com/vercel/next.js/discussions/34774
module.exports = async (...args) => {
    process.env.TZ = 'UTC'; // run all times in UTC

    const fn = createJestConfig(customJestConfig);
    const res = await fn(...args);

    res.transformIgnorePatterns = res.transformIgnorePatterns.map((pattern) => {
        // This can be affected by next config `transpilePackages`
        if (pattern === '/node_modules/') {
            return '/node_modules(?!/crypto-hash)/';
        }
        return pattern;
    });

    return res;
};
