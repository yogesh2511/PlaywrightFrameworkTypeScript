import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UserPage } from '../pages/UserPage';
import { TopPageNavigation } from '../pages/TopPageNavigation';
import { ShopPage } from '../pages/ShopPage';
import { CheckOutPage } from '../pages/CheckOutPage';
import { OrdersPage } from '../pages/OrdersPage';
import { WellnessPage } from '../pages/WellnessPage';

type PomFixturesType = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  userPage: UserPage;
  topPageNavigation: TopPageNavigation;
  shopPage: ShopPage;
  checkOutPage: CheckOutPage;
  ordersPage: OrdersPage;
  wellnessPage: WellnessPage;
  // Removed commonUtils from here so it doesn't conflict with common-fixture.ts
};

export const test = baseTest.extend<PomFixturesType>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => await use(new DashboardPage(page)),
  userPage: async ({ page }, use) => await use(new UserPage(page)),
  topPageNavigation: async ({ page }, use) => await use(new TopPageNavigation(page)),
  shopPage: async ({ page }, use) => await use(new ShopPage(page)),
  checkOutPage: async ({ page }, use) => await use(new CheckOutPage(page)),
  ordersPage: async ({ page }, use) => await use(new OrdersPage(page)),
  wellnessPage: async ({ page }, use) => await use(new WellnessPage(page)),
});