import { expect, Locator, Page } from "@playwright/test";
import { promises } from "node:dns";
import { CheckOutPage } from "./CheckOutPage";

export class CartPage {
    readonly page: Page;
    readonly productCartPage: Locator;
    readonly secureCheckOutBtn: Locator;
    constructor(page: Page) {
        this.page = page;
        this.productCartPage = page.getByTestId('breadcrumb').getByText('Cart');
        this.secureCheckOutBtn = page.getByTestId('cart_checkout_button');
    }
    async validateCartPage() {
        await expect(this.productCartPage).toBeVisible();
    }
    async clickOnSecureCheckOutBtn(): promises<CheckOutPage> {
        await this.secureCheckOutBtn.click();
        return new CheckOutPage(this.page);
    }

}