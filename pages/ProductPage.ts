import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    readonly productPage: Locator;
    readonly addToCartBtn: Locator;
    readonly addToCardMessage:Locator;
    readonly productId: string;
    constructor(page: Page, productId: string) {
        this.page = page;
        this.productId = productId;
        this.productPage = page.getByTestId('breadcrumb').getByText('Shop');
        this.addToCartBtn = page.getByTestId('product_detail_add_to_cart_button');
        this.addToCardMessage= page.getByTestId('toast_title');
    }
    async validateProduct() {
        await expect(this.productPage).toBeVisible();
    }
    async addToCart() {
       // await this.addToCartBtn.click();
        await this.addToCartBtn.click();
        await expect(this.addToCardMessage).toBeVisible();    
    }

}