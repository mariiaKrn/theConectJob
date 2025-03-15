import { Page, expect } from "@playwright/test";
import { Methods } from "./methods";

export class HomePage extends Methods {
    constructor (page: Page) {
        super(page);
    }

    async visitSite() {
        await this.page.goto('/');
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle('The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office');
    }

    async verifyURL() {
        await expect(this.page).toHaveURL('https://theconnectedshop.com');
    }
}