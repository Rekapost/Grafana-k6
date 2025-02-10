import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
    scenarios: {
        browser_test: {
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};

export default async function () {
    console.log('Creating a new browser context...');
    const context = await browser.newContext();  // Ensure this is 'awaited'
    const page = await context.newPage();        // Ensure this is 'awaited'

    const response = await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo', { timeout: 60000 });
    if (!response || !response.ok()) {
        console.log('Failed to load page');
        return;
    }
    const dropdown = await page.locator('#select-demo');
    // direct fetching for small list
    // await dropdown.selectOption({ index: 1 }); // Select the second option from the dropdown
    // await dropdown.selectOption('Tuesday');
    await page.waitForTimeout(5000); // Wait for 5 seconds
    // for big list 
        const options = await page.$$('#select-demo option'); // Get all options in the dropdown
        
        for (const option of options) {
            
            const valueName = await option.textContent();
            console.log(valueName);  // Logs the text content of each option
            if (valueName === 'Friday') {
                await page.selectOption('#select-demo', valueName); // Select the 'Tuesday' option
                break;  // Exit the loop once the desired option is selected
            }
        }

    // Take a screenshot after submission
    await page.screenshot({
        fullPage:true,
        path: './screenshots/dropdown.png'
    });
    
    console.log('Closing the page...');
    await page.close(); // Close the page
    await context.close(); // Close the context
}
