import { Page } from "@playwright/test";
import process from 'node:process';
import { DashboardPage } from "./DashboardPage";


export class LoginPage {
  readonly page: Page;
  readonly email;
  readonly password;
  readonly singIn;
  readonly loginAlertMessage;
  readonly wrongPassword;

  constructor(page: Page) {
    this.page = page;
    this.email = this.page.getByTestId("email_id");
    this.password = this.page.getByTestId("password_id");
    this.singIn = this.page.getByTestId("signin_button");
    this.loginAlertMessage = page.getByTestId('login_alert_message');
    this.wrongPassword = page.getByText('Enter a valid email address');
  }

  async goToLoginPage(): Promise<void> {
    await this.page.goto(new URL('login.html', `${process.env.BASE_URL!}/`).toString());
  }

  async singInValidUser(username: string, pwd: string): Promise<DashboardPage | LoginPage> {
    await this.email.fill(username);
    await this.password.fill(pwd);
    await this.singIn.click();
    if (await this.loginAlertMessage.isVisible() || await this.wrongPassword.isVisible()) {
      return this;
    }
    return new DashboardPage(this.page);
  }
}