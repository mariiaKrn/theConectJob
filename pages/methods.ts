import {Page, Locator, expect} from "@playwright/test";

export class Methods {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyVisible (locator: Locator, options: {timeout?: number} = {}) {
        await expect(locator).toBeVisible(options);
    }

    async verifyText (locator: Locator, text: string, options: {timeout?: number} = {}) {
        await expect(locator).toHaveText(text, options);
    }

    async verifyAttribute (
        locator: Locator, 
        attribute: string, 
        value: string, 
        options: {timeout?: number} = {}) {
            await expect(locator).toHaveAttribute(attribute, value, options);
        }

    async fillField (locator: Locator, value: string) {
        await locator.fill(value);
        await expect(locator).toHaveValue(value);
    }

    async click (locator: Locator) {
        await locator.click();
    }

    async verifyEnabled (locator: Locator, options: {timeout?: number} = {}) {
        await expect(locator).toBeEnabled();
    }
}