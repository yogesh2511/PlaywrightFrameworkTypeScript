import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import process from 'node:process';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import {CommonUtils} from '../utils/common-utils';
import path from 'path';
import * as fs from 'fs';

// Path to save authentication state
//const authFile = './playwright/.auth/user.json';
const STORAGE_STATE = path.join(process.cwd(), '../playwright/.auth/user.json');
const SESSION_STATE = path.join(process.cwd(), '../playwright/.auth/session.json');test('Global Setup for Auto Login', async ({ browser }) => {
     // Create a new browser context
   const loginContext = await browser.newContext();

    // Open a new page within the context
    const page = await loginContext.newPage();
    const commonUtils = new CommonUtils();
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.singInValidUser(commonUtils.getUserName(), commonUtils.getPassword());
    await page.waitForURL(process.env.BASE_URL+"/home.html");
    await expect(new DashboardPage(page).menuIcon).toBeVisible();
    await mkdir('./playwright/.auth', { recursive: true });
     // Save the browser's storage state (including authentication) to a file
    await loginContext.storageState({ path: STORAGE_STATE });

    // 2. Extract Session Storage and save to file
    const sessionStorageData = await page.evaluate(() => JSON.stringify(window.sessionStorage));
    fs.writeFileSync(SESSION_STATE, sessionStorageData, 'utf-8'); 
    })
