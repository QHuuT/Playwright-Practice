import { createBdd } from "playwright-bdd";
import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page"

const { Given, When, Then } = createBdd();

When('l\'utilisateur clique sur le logo du site', async ({ page }) => {
    const basePage = new HomePage(page);
    await basePage.clicLogoImage()
});

Given('la page d\'accueil est affichée', async ({ page }) => {
    const basePage = new HomePage(page);

    await test.step('le lien de la page d\'accueil est conforme', async () => {
        await basePage.verifierURL('https://practicetestautomation.com/')
    });
    await test.step('le titre de la page d\'accueil est conforme', async () => {
        await expect(basePage.getHomeTitle()).toBeVisible()
    })
})
