import { Locator, Page } from "@playwright/test";
import process from 'node:process';
import {DashboardPage} from "./DashboardPage";
import {ShopPage} from "./ShopPage";
import {WellnessPage} from "./WellnessPage";
import {OrdersPage} from "./OrdersPage";
import {ProductPage} from "./ProductPage";
import {CartPage} from "./CartPage";
import { CheckOutPage } from "./CheckOutPage";

export class TopPageNavigation {
    readonly page: Page;
    readonly menuIcon: Locator;
    readonly shop: Locator;
    readonly order: Locator;
    readonly wellness: Locator;
    readonly home: Locator;
    readonly cart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuIcon = this.page.getByTestId("account_menu_button");
        this.shop = this.page.getByTestId('nav_shop');
        this.order = this.page.getByTestId('nav_orders');
        this.wellness = this.page.getByTestId('nav_wellness');
        this.home = this.page.getByTestId('brand_logo');
        this.cart = this.page.getByTestId('cart_button');
    }

    private buildAppUrl(path: string): string {
        return new URL(path, `${process.env.BASE_URL!}/`).toString();
    }

    async goToDashboardPage(page: Page = this.page): Promise<DashboardPage> {
        await this.home.click();
        await this.page.goto(this.buildAppUrl('home.html'));
        return new DashboardPage(page);
    }

    async goToShoPage(page: Page = this.page): Promise<ShopPage> {
        await this.shop.click();
        await this.page.goto(this.buildAppUrl('products.html'));
        return new ShopPage(page);
    }

    async goToOrderPage(page: Page = this.page): Promise<OrdersPage> {
        await this.order.click();
        await this.page.goto(this.buildAppUrl('orders.html'));
        return new OrdersPage(page);
    }

    async goToWellnessPage(page: Page = this.page): Promise<WellnessPage> {
        await this.wellness.click();
        await this.page.goto(this.buildAppUrl('wellness.html'));
        return new WellnessPage(page);
    }

    async goToProductPage(page: Page = this.page,productID: string): Promise<ProductPage> {
        await this.page.goto(this.buildAppUrl(`product.html?id=${productID}`));
        return new ProductPage(this.page, productID);
    }

    async goCartPage(page: Page = this.page): Promise<CartPage> {
        await this.cart.click();
        await this.page.goto(this.buildAppUrl('cart.html'));
        return new CartPage(this.page);
    }

    async goChekOutPage(page: Page = this.page): Promise<CheckOutPage> {
        await this.page.goto(this.buildAppUrl('checkout.html'));
        return new CheckOutPage(this.page);
    }
}
