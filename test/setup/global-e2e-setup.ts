import * as fs from 'fs';

import { config } from 'dotenv';

import { logger } from '@/lib/logger/logger';

async function configureE2E() {
    configureEnvironment();
    await seedE2e();
    logger.info({ message: 'E2E configuration', baseURL: process.env.APP_URL });
}

export function configureEnvironment() {
    const E2E_ENV_NAME = process.env.E2E_ENV_NAME ?? 'local';

    const e2eConfigFile = `config/.env.e2e.${E2E_ENV_NAME}`;

    config({ path: e2eConfigFile, override: false });

    const e2eConfigOverrideFile = `${e2eConfigFile}.override`;
    if (fs.existsSync(e2eConfigOverrideFile)) {
        config({ path: e2eConfigOverrideFile, override: true });
    }
}

// Seed test data for all e2e test suites
async function seedE2e() {
    await seedUsers();
    await seedTestData();
}

async function seedUsers() {
    // Create users here
}

async function seedTestData() {
    // Seed data here
}

// Required to be default by Playwright config. Ref https://playwright.dev/docs/test-global-setup-teardown
// eslint-disable-next-line import/no-default-export
export default configureE2E;
