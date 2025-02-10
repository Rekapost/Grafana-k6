import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser_tests: {
      executor: 'constant-vus',
      vus: 1,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium', // Change to 'webkit' if needed
          headless: false,  // Open Browser in GUI mode
        },
      },
    },
  },
};

export default async function () {
  console.log('Creating a new browser context...');
  const context = await browser.newContext(); // Ensure 'await' is used to wait for context creation
  const page = await context.newPage(); // Ensure 'await' is used to wait for page creation
  
  //View port for the browser
  await page.setViewportSize({ width: 1920, height: 1080 });
  console.log('Browser context created successfully');

  console.log('Navigating to Google...');
  const response = await page.goto('https://www.google.com/');

  if (!response || !response.ok()) {
    console.log('Failed to load page');
    return;
  }

  console.log('Waiting for page to load...');
  await page.waitForLoadState('load'); // Wait for full page load

  console.log('Waiting for title element to load...');
  await page.waitForSelector('title', { timeout: 60000 }); // Wait for title for 60 seconds
  
  console.log('Page Title:', await page.title()); // Log the page title
  
  console.log('Taking a screenshot...');
  await page.screenshot({ path: 'google_screenshot.png' }); // Take a screenshot
  
  console.log('Closing the page...');
  await page.close(); // Close the page
  await context.close(); // Close the context
}

//C:\Users\nreka\vscodedevops\k6\Grafana-k6-script>k6 run browser-test.js  
//set K6_BROWSER_HEADLESS=false 
//k6 run browser-test.js


/*
import { browser } from 'k6/browser';

export default async function () {
    const context = browser.newContext();  // Create a new context
    const page = context.newPage();        // Create a new page within the context

    console.log('Page opened successfully');
    await page.close();
}
*/
    //browser.open('https://example.com');
    //browser.check('Example website loaded', () => browser.url().includes('example.com'));
