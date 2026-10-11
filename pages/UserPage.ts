import { Locator, Page } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage'

export class UserPage {
    readonly page: Page;
    readonly userMenuButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userMenuButton = page.getByTestId('account_menu_button');
        this.logoutButton = page.getByTestId('logout_button');
    }

    async logout(): Promise<LoginPage> {
        await this.userMenuButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.userMenuButton.click();
        await this.logoutButton.waitFor({ state: 'visible', timeout: 15000 });
        await this.logoutButton.click();

        const baseUrl = (process.env.BASE_URL || '').replace(/\/?$/, '/');
        const expectedUrl = new URL('login.html?loggedOut=1', baseUrl).toString();
        await this.page.waitForURL(expectedUrl, { timeout: 15000 });

        return new LoginPage(this.page);
    }
}