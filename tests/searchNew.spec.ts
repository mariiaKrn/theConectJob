import { test } from "@playwright/test";
import { Search } from "../pages/search";
import { HomePage } from "../pages/homePage";
import { Header } from "../pages/header";

test.describe("Check search functionality", () => {
    let search: Search;
    let homePage: HomePage;
    let header: Header;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        search = new Search(page);
        header = new Header(page);
        await homePage.visitSite();
        await header.clickSearchLink();
        await search.verifySearchInput();
    })
    
    test ("Check search input with valid data", async ({page}) => {
            await search.fillSearchInput("Smart Door Lock Slim");
            await search.verifyResults();
    })

    test ("Check search with invalid data", async ({page}) => {
            await search.fillSearchInput('123456789');
            await search.verifyNoResults();
    })

})