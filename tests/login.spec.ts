import { expect } from '@playwright/test';
import { test } from '../fixture/hooks-fixture';

test('Navigate to Home page', async ({ gotoUrl, page }) => {
  await expect(page.getByTestId('account_menu_button')).toBeVisible();
});

test('Navigate to Home2 page', async ({ gotoUrl, page }) => {
  await expect(page.getByTestId('account_menu_button')).toBeVisible();
});

test('Navigate to Home3 page', async ({ gotoUrl, logout }) => {
  
});
// pagetest('Check out the product',async({navigation,page})=>{
//    let shopePage= await navigation.goToShoPage();
//    await shopePage.validate();
//    let productID =await shopePage.getProductIdByName('Multivitamin Gummies');
   
//    let productpage = await navigation.goToProductPage(productID);
//    await productpage.validateProduct();
// //     await page.getByTestId('cart_button').click();
// //    let cartpage =  await navigation.goCartPage();
// //    await cartpage.validateCartPage();
   

//   await expect(page.getByTestId('product_name')).toBeVisible();
//   await page.getByTestId('product_detail_add_to_cart_button').click();
//   await expect(page.getByTestId('cart_button')).toBeVisible();
//   await page.getByTestId('cart_button').click();
//   await expect(page.getByTestId('cart_heading')).toBeVisible();
//   await page.getByTestId('cart_checkout_button').click();
//   await page.getByTestId('checkout_house_input').click();
//   await page.getByTestId('checkout_house_input').fill('BALAJI HOSPITAL');
//   await page.getByTestId('checkout_city_input').fill('BARODA');
//   await page.getByTestId('checkout_state_input').fill('Gujrat');
//   await page.getByTestId('checkout_pincode_input').fill('390023');
//   await page.getByTestId('card_number_input').click();
//   await page.getByTestId('card_number_input').fill('t');
//   await page.getByTestId('card_number_input').click();
//   await page.getByTestId('card_number_input').fill('1231 4424 2424 2424'); 
//   await page.getByTestId('card_expiry_input').fill('12/01');
//   await page.getByTestId('card_expiry_input').press('Tab');
//   await page.getByTestId('card_cvv_input').fill('123');
//   await page.getByTestId('card_cvv_input').press('Tab');
//   await page.getByTestId('card_name_input').fill('Card');
//   await page.getByTestId('terms_checkbox').check();
//   await page.getByTestId('checkout_place_order_button').click();
//   await expect(page.getByTestId('confirmation_heading')).toBeVisible();
//   await page.getByTestId('track_order_button').click();
//   await expect(page.getByRole('heading', { name: 'Order summary' })).toBeVisible();

// });

