import { Page, Locator, expect } from "@playwright/test";
import { Methods } from "./methods";

export class Search extends Methods {
    private searchInput: Locator;
    private searchResult: Locator;
    private noSearchResults: Locator;

    constructor (page: Page){
        super(page);
        this.searchInput = page.locator('input[name="q"]');
        this.searchResult = page.locator('span.Heading.Text--subdued.u-h7').first();
        this.noSearchResults = page.locator('.Segment__Content').first();
    }



    async verifySearchInput() {
        await this.verifyVisible(this.searchInput);
        await this.verifyAttribute(this.searchInput, 'placeholder', 'Search...');
        await this.verifyEnabled(this.searchInput);
    }

    async fillSearchInput(value: string) {
        await this.fillField(this.searchInput, value)
    }

    async verifyResults() {
        await this.verifyVisible(this.searchResult);
        const text = await this.searchResult.innerText();
        console.log('text is:', text);
        const match = text.match(/(\d+)/);
        await expect(match).not.toBeNull();
        if(match) {
            const number = parseInt(match[1], 10);
            console.log('number:', number);
            await expect(number).toBeGreaterThan(0);
        }        
    }

    async verifyNoResults() {
        await this.verifyVisible(this.noSearchResults);
        await this.verifyText(this.noSearchResults, 'No results could be found');
    }
}