import { browser } from 'k6/browser';
import { check } from 'k6'

export const options = {
    scenarios: {
        browser_test: {
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium'
                }
            }
        }
    }
}

export default async function () {
    //const page = browser.newPage()
    console.log('Creating a new browser context...');
    const context = await browser.newContext();  // Ensure this is 'awaited'
    const page = await context.newPage();        // Ensure this is 'awaited'
    console.log('Navigating to Google...');
    const response = await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register', { timeout: 60000 });
    if (!response || !response.ok()) {
        console.log('Failed to load page');
        return;
      }
    console.log('Waiting for page to load...');
    await page.waitForLoadState('load'); // Wait for full page load
    //await page.locator('#input-firstname').type('k6');
    await page.locator('#input-firstname').waitFor({ state: 'visible' });
    await page.locator('#input-firstname').type('k6');
    
    await page.locator('#input-lastname').waitFor({ state: 'visible' });
    await page.locator('#input-lastname').type('demo');
    
    await page.locator('#input-email').waitFor({ state: 'visible' });
    await page.locator('#input-email').type('dummy101@gmail.com');
    
    await page.locator('#input-telephone').waitFor({ state: 'visible' });
    await page.locator('#input-telephone').type('1234567890');
    
    await page.locator('#input-password').waitFor({ state: 'visible' });
    await page.locator('#input-password').type('Test123!!');
    
    await page.locator('#input-confirm').waitFor({ state: 'visible' });
    await page.locator('#input-confirm').type('Test123!!');

    
     // Check the terms and conditions checkbox
    await page.check('input[type="checkbox"]');
     // Submit the form
    const submit = page.locator('input[type="submit"]');
    await Promise.all([page.waitForNavigation(), submit.click()]);
    // Ensure the page has loaded after submitting the form
    await page.waitForLoadState('load');  // Explicit wait after clicking submit

     // Take a screenshot after submission
    await page.screenshot({
        fullPage:true,
        path: './screenshots/form.png'
    });

    // Validate the success message
    const h1Text = await page.locator('h1').textContent();
    check(h1Text, {
    'Text Validation': (text) => text === "My Account",
    });

    console.log('Closing the page...');
    await page.close(); // Close the page
    await context.close(); // Close the context
}