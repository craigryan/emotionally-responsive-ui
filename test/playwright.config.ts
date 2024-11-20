/* 

Playwright test configuration file.
See https://playwright.dev/docs/test-configuration

Full details of all supported Playwright devices:
https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json

Viewports:
    mobile: '375px',
    tablet: '834px',
    laptop: '1290px',
    desktop: '1440px',
    
*/

import { devices } from '@playwright/test';

import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    globalSetup: './setup/global-e2e-setup',
    testDir: './e2e',
    outputDir: 'e2e-results', // Folder for test artifacts such as screenshots, videos, traces, etc.
    timeout: 60 * 1000,
    expect: {
        timeout: 10000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1, // to avoid conflicts with mailosaur otp
    reporter: 'html',
    use: {
        actionTimeout: 0,
        headless: process.env.CI ? true : false,
        baseURL: process.env.APP_URL,
        trace: 'on-first-retry',
        screenshot: {
            mode: 'only-on-failure',
            fullPage: true,
        },
        video: 'on',
    },

    projects: [
        {
            name: 'chrome',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
                viewport: { width: 1440, height: 1200 },
            }, // or 'chrome-beta'
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                viewport: { width: 1440, height: 1200 },
            },
        },

        /* Test against mobile viewports. */
        {
            name: 'mobile-chrome',
            use: {
                ...devices['Pixel 5'],
                viewport: { width: 375, height: 664 },
            },
        },
        {
            name: 'mobile-safari',
            use: {
                ...devices['iPhone 12'],
                viewport: { width: 375, height: 664 },
            },
        },
    ],
};

// Required to be default by Playwright
// eslint-disable-next-line import/no-default-export
export default config;
