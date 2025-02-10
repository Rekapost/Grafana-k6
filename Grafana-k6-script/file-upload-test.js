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

    const response = await page.goto('https://www.lambdatest.com/selenium-playground/upload-file-demo', { timeout: 60000 });
    if (!response || !response.ok()) {
        console.log('Failed to load page');
        return;
    }

    // Upload the file
    await page.setInputFiles('#file', { name: 'testData/test.pdf' });

    // Optionally, you can wait for the file to be processed or any other indicator
    await page.waitForSelector('#file', { state: 'attached' });  // Wait until the input is attached
    console.log('File uploaded successfully');

    // Take a screenshot after submission
    await page.screenshot({
        fullPage:true,
        path: './screenshots/fileupload.png'
    });
    // You can also check that the upload success message or any confirmation appears (if needed)
     check(page, {
         'file upload success': (p) => p.locator('.File Successfully Uploaded').isVisible(),
         //'Text validation': (p) => p.locator('#error').textContent() == "File Successfully Uploaded"
         /*'Text validation': (p) => {
                const errorText = p.locator('#error').textContent().trim();
                return errorText.toLowerCase() === "file successfully uploaded".toLowerCase();
            },*/
        });

    console.log('Closing the page...');
    await page.close(); // Close the page
    await context.close(); // Close the context
}
