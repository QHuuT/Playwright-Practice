import { createBdd } from "playwright-bdd";
import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page"
import { LoginSuccessPage } from "../pages/login-success.page";
import {LoginPage} from "../pages/login.page";

const { Given, When, Then } = createBdd();

Given('l\'utilisateur se trouve sur la page d\'accueil', async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step('l\'utilisateur se rend sur le site Test Automation Practice', async () => {
        await page.goto('https://practicetestautomation.com/')
    });
    await test.step('le lien de la page d\'accueil est conforme', async () => {
        await homePage.verifierURL('https://practicetestautomation.com/')
    });
    await test.step('le titre de la page d\'accueil est conforme', async () => {
        await expect(homePage.getHomeTitle()).toBeVisible()
    })
});

When('l\'utilisateur clique sur le logo du site', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clicLogoImage()
});

When ('l\'utilisateur se rend sur la page {string}', async ({ page }, lien: string) => {
    const homePage = new HomePage(page);
    const lienCible = {
        "HOME": { nomPage: 'Home'},
        "PRACTICE": { nomPage: 'Practice'},
        "COURSES": { nomPage: 'Courses'},
        "BLOG": { nomPage: 'Blog'},
        "CONTACT": { nomPage: 'Contact'}
    }
    const { nomPage } = lienCible[lien];

    await test.step(`l'utilisateur clique sur le lien : "${nomPage}"`, async () => {
        await homePage.clicMenuLink(nomPage)
    })
});

Then('la page {string} est affichée', async ({ page }, url: string) => {
    const homePage = new HomePage(page);
    await test.step('le lien de la page est conforme', async () => {
        await homePage.verifierURL(url)
    })
});

Then('l\'utilisateur est redirigé vers la page d\'accueil', async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step('le lien de la page d\'accueil est conforme', async () => {
        await homePage.verifierURL('https://practicetestautomation.com/')
    });
    await test.step('le titre de la page d\'accueil est conforme', async () => {
        await expect(homePage.getHomeTitle()).toBeVisible()
    })
});

Then('l\'utilisateur est redirigé vers la page de connexion', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('le lien de la page d\'accueil est conforme', async () => {
        await loginPage.verifierURL('https://practicetestautomation.com/practice-test-login/')
    });
    await test.step('le titre de la page d\'accueil est conforme', async () => {
        await expect(loginPage.getLoginTitle()).toBeVisible()
    })
})