import { test, expect } from '../fixture/hooks-fixture';
import loginModuleData from '../test-data/login-module-data.json';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

test('Login functionality check with invalid password', async ({ loginPage, commonUtils }) => {
    const username = commonUtils.decryptData(process.env.USER_NAME!);
    await loginPage.goToLoginPage();
    await loginPage.singInValidUser(username, loginModuleData.wrong_password);
    await expect(loginPage.loginAlertMessage).toBeVisible();
});

test('Login functionality check with invalid username',
    {
        tag: ['@UI', '@Demo'],
        annotation: {
            type: 'This login with Invalid TC',
            description: 'Making fun',
        }
    },
    async ({ loginPage, commonUtils }) => {
        const password = commonUtils.decryptData(process.env.PASSWORD!);
        await loginPage.goToLoginPage();
        await loginPage.singInValidUser(loginModuleData.wrong_username, password);
        await expect(loginPage.wrongPassword).toBeVisible();
    }
);

test('Login functionality check with wrong username and password', async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.singInValidUser(loginModuleData.wrong_username, loginModuleData.wrong_password);
    await expect(loginPage.wrongPassword).toBeVisible();
});