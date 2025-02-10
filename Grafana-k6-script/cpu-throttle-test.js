import { browser } from 'k6/browser';

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
    const context = await browser.newContext();  // Create a new browser context
    const page = await context.newPage();        // Create a new page

    await page.setViewportSize({
        width: 414,
        height: 896
    });

    await page.throttleCPU({ rate: 4 });  // Throttle CPU

    await page.goto('https://www.google.com/');
    await page.close();
    await context.close();  // Don't forget to close the context
}

