import { browser, networkProfiles } from 'k6/browser';

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
    // Create a new browser context
    const context = await browser.newContext();
    const page = await context.newPage();

    // Set viewport size  IPhone SR size
    await page.setViewportSize({
        width: 414,
        height: 896
    });

    // Apply network throttling
    await page.throttleNetwork(networkProfiles['Fast 3G']);  // Slow 3G network profile/ Fast 3G network profile

    // Navigate to the page
    await page.goto('https://www.google.com/');

    // Take action (optional)
    await page.waitForTimeout(2000);  // Adding delay for demonstration

    // Close the page
    await page.close();
    await context.close();
}

//set K6_BROWSER_HEADLESS=true
//K6_BROWSER_HEADLESS=true k6 run throttle-network-speed-test.js  
//set K6_BROWSER_HEADLESS=false
//k6 run throttle-network-speed-test.js