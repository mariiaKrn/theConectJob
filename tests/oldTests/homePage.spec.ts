import {test, expect} from '@playwright/test';

test ('Open home page and check titles and URLs', async({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle('The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office');
    await expect(page).toHaveURL('https://theconnectedshop.com');
})