import { createBdd } from "playwright-bdd";
import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/base.page"

const { Given, When, Then } = createBdd();

When('l\'utilisateur clique sur le logo du site', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.clicLogoImage()
});

Then('la page d\'accueil est affichée', async ({ page }) => {
    const basePage = new BasePage(page);

    await test.step('le lien de la page d\'accueil est conforme', async () => {
        await basePage.verifierURL('https://practicetestautomation.com/')
    });
    await test.step('le titre de la page d\'accueil est conforme', async () => {
        await expect(basePage.getHomeTitle()).toBeVisible()
    })
})
