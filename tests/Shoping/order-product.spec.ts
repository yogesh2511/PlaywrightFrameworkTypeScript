import { test, expect } from '../../fixture/hooks-fixture';
import Products from '../../test-data/demo/Products.json'

let shopPage: any;
let productPage: any;
let cartPage: any;
let checkOutPage: any;
// We pass `gotoUrl` to trigger the navigation hook, and `page` for assertions
test('Order the product', async ({ page, gotoUrl, topPageNavigation }) => {

    await test.step(`Open the Home page and Navigate to Shop Page`, async () => {
        shopPage = await topPageNavigation.goToShoPage();
        // Recommended: Use the default 'page' fixture directly for standard assertions
        await expect(page).toHaveURL(/products\.html$/);
    });
    await test.step(`Select the ${Products.product_name} and add to the cart`, async () => {
        productPage = await shopPage.goToProductPageByName(`${Products.product_name}`);
        await productPage.validateProduct();
        await productPage.addToCart();
    });
    await test.step(`Go to the cart and validate then click on Secute check in`, async () => {
        cartPage = await topPageNavigation.goCartPage();
        await cartPage.validateCartPage();
        await cartPage.clickOnSecureCheckOutBtn();
    });
    await test.step(`Navigate to checkout page and Validate the card`, async () => {
        checkOutPage = await topPageNavigation.goChekOutPage();
        await checkOutPage.validateCheckOutPage();
    });
});