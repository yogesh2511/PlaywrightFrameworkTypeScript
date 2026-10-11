import { expect, Locator, Page } from "@playwright/test";
import process from 'node:process';
import { ProductPage } from "./ProductPage";

export class ShopPage {
  readonly page: Page;
  readonly shopText: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.shopText = page.getByTestId('breadcrumb').getByText('Shop');
  }

  async goToShopPage(): Promise<void> {
    await this.page.goto(new URL('products.html', `${process.env.BASE_URL!}/`).toString());
    await expect(this.shopText).toBeVisible();
  }


  /**
 * Hovers over a product by its visible display name text and extracts its dynamic ID
 * @param productName The exact or partial visible text of the link (e.g., 'Vitamin C 1000mg')
 */
  async goToProductPageByName(productName: string): Promise<ProductPage | string> {
    // 1. Locate the specific hyperlink matching the product title text string
    const productLink = this.page.getByRole('link', { name: productName, exact: true });

    // 2. Perform the mouse hover action on the discovered link
    await productLink.hover();

    // 3. Extract the 'href' attribute (e.g., "product.html?id=p3")
    const relativeHref = await productLink.getAttribute('href');
    if (!relativeHref) {
      throw new Error(`Could not find a valid href link for product named: "${productName}"`);
    }

    // 4. Safe URL parameter parsing to extract the dynamic ID value
    const urlParams = new URLSearchParams(relativeHref.split('?')[1]);
    const productID = urlParams.get('id');

    if (!productID) {
      throw new Error(`The link for "${productName}" does not contain a valid 'id' query parameter.`);
    }

    try {
      const isVisible = await productLink.isVisible();
      if (isVisible) {
        await productLink.click();
        return new ProductPage(this.page, productID);
      }
      return productID;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(message);
      throw error;
    }
  }
}