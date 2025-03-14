import {test, expect, Page} from '@playwright/test';

test.describe('Check search function', () => {
    let searchInput;
    let searchLink;

    test.beforeEach(async ({page}) => {
        searchInput = page.locator('input[name="q"]');
        searchLink = page.locator('a[data-action="toggle-search"].Heading.Link');
        await page.goto('/');
        await expect(searchLink).toBeVisible();
        await expect(searchLink).toHaveAttribute('href', '/search');
        await expect(searchLink).toHaveText('Search');
        await searchLink.click();
        await expect(searchInput).toBeVisible();
        await expect(searchInput).toBeEnabled();
        await expect(searchInput).toHaveAttribute('placeholder', 'Search...');
    })

    test.afterEach(async ({page}) => {
        await page.close();
    })

    test ('Search existing product', async ({page}) => {
        const searchValue = 'Smart Door Lock Slim';
        await searchInput.fill(searchValue);
        await expect(searchInput).toHaveValue(searchValue);
        const searchResult = page.locator('span.Heading.Text--subdued.u-h7').first();
        await expect(searchResult).toBeVisible();
        const text = await searchResult.innerText();
        console.log('text is:', text);
        const match = text.match(/(\d+)/);
        await expect(match).not.toBeNull();
        if(match) {
            const number = parseInt(match[1], 10);
            console.log('number:', number);
            await expect(number).toBeGreaterThan(0);
        }
        const firstSearchResultTitle = page.locator('#Search').getByRole('link', { name: 'Smart Door Lock Slim', exact: true });
        await expect(firstSearchResultTitle).toBeVisible;
        //await expect(firstSearchResultTitle).toHaveAttribute('href', '/products/smart-door-lock-slim');
        await expect(firstSearchResultTitle).toHaveText(searchValue);
    })

    test ('Search unexisting product', async({page}) => {
        const searchInvalidValue = '123456789';
        await searchInput.fill(searchInvalidValue);
        await expect(searchInput).toHaveValue(searchInvalidValue);
    })
})

