import { test } from '@playwright/test';

import { HomePage } from '@/test/pages/home.page';

test('View dashboard page', async ({ page }) => {
    const dashboardPage: HomePage = new HomePage(page);
    await dashboardPage.assertDisplayed();
});
