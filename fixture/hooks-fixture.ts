import { test as commonTest } from './common-fixture';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';

type HooksFixtureType = {
    gotoUrl: void;
    logout: void;
};

export const test = commonTest.extend<HooksFixtureType>({
    gotoUrl: async ({ page }, use) => {
        // 1. Navigate to the Base URL first to initialize the domain/origin
        await page.goto(process.env.BASE_URL!);

        // 2. Read the saved session storage file
        const sessionFilePath = path.join(process.cwd(), 'playwright/.auth/session.json');
        if (fs.existsSync(sessionFilePath)) {
            const sessionData = fs.readFileSync(sessionFilePath, 'utf-8');

            // 3. Inject the session storage into the browser
            await page.evaluate((data) => {
                const entries = JSON.parse(data);
                for (const [key, value] of Object.entries(entries)) {
                    window.sessionStorage.setItem(key, value as string);
                }
            }, sessionData);
        }

        // 4. Now navigate to the authenticated home page
        await page.goto(new URL('home.html', `${process.env.BASE_URL!}/`).toString());
        await expect(page.getByTestId('account_menu_button')).toBeVisible({ timeout: 15000 });

        await use();
    },

    logout: [async ({ page, userPage }, use) => {
        await use();

        try {
            const currentUrl = page.url();
            if (!currentUrl.includes('/home.html')) {
                return;
            }

            await userPage.userMenuButton.waitFor({ state: 'visible', timeout: 10000 });
            await userPage.logout();

        } catch {
            // teardown-only guard
        }
        finally {
            const context = page.context();
            await page.close();
            await context.close();
        }
    }, { auto: true }] // auto:true means you don't need to pass logout into every test!
});

export { expect };