import { expect, test } from '@playwright/test';

import { HomePage } from '@/test/pages/home.page';
import { Auth0LoginPage } from '@/test/pages/auth0-login.page';

test('Smoke @smoke', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    const auth0LoginPage = new Auth0LoginPage(page);
    await expect(auth0LoginPage.emailInput).toBeVisible();
});
