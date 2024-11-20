import { expect, type Page } from '@playwright/test';

import { AppPage } from '.';

export class HomePage extends AppPage {
    static readonly ROUTE = '/';
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async goto() {
        await this.page.goto(HomePage.ROUTE);
    }

    async assertDisplayed() {
        await expect(this.page).toHaveURL('/dashboard');
    }
}
