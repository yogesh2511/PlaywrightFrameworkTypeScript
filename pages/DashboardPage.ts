import { Page } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly menuIcon;

    constructor(page: Page) {
        this.page = page;
        this.menuIcon = this.page.getByTestId("account_menu_button");
    }

    async goToDashboardPage(): Promise<void> {
    await this.page.goto(new URL('home.html', `${process.env.BASE_URL!}/`).toString());
  }
}
