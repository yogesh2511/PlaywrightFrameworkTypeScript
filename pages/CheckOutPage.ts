import { expect, Locator, Page } from "@playwright/test";

export class CheckOutPage {
    readonly page: Page;
    readonly productCheckOutTitle: Locator;
    constructor(page: Page) {
        this.page = page;
        this.productCheckOutTitle =  page.getByTestId('breadcrumb').getByText('Checkout');

    }
    async validateCheckOutPage() {
        await expect(this.productCheckOutTitle).toBeVisible();
    }
}