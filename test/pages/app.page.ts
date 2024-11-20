import { type Locator, type Page } from '@playwright/test';

// App wide base page object
export class AppPage {
    static readonly APP_NAME = 'Emotionally Responsive';

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Get the selected option from a <select> element.
     * See https://playwright.dev/docs/input#select-options
     * @param selectLocator
     */
    getSelected(selectLocator: Locator): Locator {
        return selectLocator.locator('option[selected]');
    }
}
