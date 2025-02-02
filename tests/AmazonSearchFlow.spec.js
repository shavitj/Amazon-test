import { test, expect } from '@playwright/test';

    test('Search for raspberry pi 5 and get the price of the 3rd item', async ({ page }) => {

    // Step 1: Navigate to the Amazon homepage
    await page.goto('https://www.amazon.com');

    // Step 2: Enter Login page
    await page.click('[id="nav-link-accountList"]');
    await page.waitForLoadState('domcontentloaded');

    // Step 3: Enter email & password & click Sign-in button
    const email = 'shavitkupatz@gmail.com'; 
    await page.fill('[type="email"]', email);
    await page.click('input#continue');

    const password = 'Sj169424!';
    await page.fill('[type="password"]', password);
    await page.click('input#signInSubmit');

    // Log a message
    console.log('Logged in successfully!');

    // Step 4: Search for 'raspberry pi 5'
    await page.locator('#twotabsearchtextbox').fill('raspberry pi 5');
    await page.locator('#nav-search-submit-button').click();
    await page.waitForLoadState('domcontentloaded');

    // Step 5: Get the price of the 3rd item
    const items = await page.locator('.s-main-slot .s-result-item').all();
    const thirdItem = items[2];

    let price = 'Price not found';
    if (thirdItem) {
        const priceElement = await thirdItem.locator('span.a-price').textContent();
        price = priceElement ? priceElement.trim() : 'price not found';
    }

    // Step 6: print the price
    console.log('price of the 3rd item:', price);

    // Assertion to ensure price is retrieved
    expect(price).not.toBe('Price not found');

    // Close the browser
    await page.close();
});