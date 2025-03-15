import { Page, Locator } from "@playwright/test";
import { Methods } from "./methods";
import { Header } from "./header";

export class Search extends Methods {
    //let header: Header.searchLink;
    private searchInput: Locator;

    constructor (page: Page){
        super(page);
        this.searchInput = page.locator('a[data-action="toggle-search"].Heading.Link');
    }

    async verifySearchInput() {
        await this.click(Header.searchLink);
    }
}