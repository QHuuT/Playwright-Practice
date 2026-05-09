import { createBdd } from "playwright-bdd";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { LoginSuccessPage } from "../pages/login-success.page";

const { Given, When, Then } = createBdd();

Given('l\'utilisateur est sur la page de connexion', async ({ page }) => {
    await test.step('l\'utilisateur se rend sur le site "Practice Test Automation"', async () => {
        await page.goto("https://practicetestautomation.com/practice-test-login/")
    })
});

When('l\'utilisateur soumet un formulaire de connexion valide', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('l\'utilisateur saisit ses identifiants', async () => {
        await loginPage.remplirFormulaire('student', 'Password123')
    });
    await test.step('l\'utilisateur clique sur le bouton de connexion', async () => {
        await loginPage.soumettreFormulaire()
    })
});

When('l\'utilisateur soumet un formulaire de connexion invalide : {string}', async ({ page }, cas: string) => {
    const loginPage = new LoginPage(page);
    const identifiants = {
        "Nom d'utilisateur vide": { username: '', password: 'Password123' },
        "Nom d'utilisateur incorrect": { username: 'incorrectUsername', password: 'Password123' },
        "Mot de passe vide": { username: 'student', password: '' },
        "Mot de passe incorrect": { username: 'student', password: 'incorrectPassword' }
    }
    const { username, password } = identifiants[cas];

    await test.step(`l'utilisateur saisit le nom d'utilisateur : "${username}"`, async () => {
        await loginPage.remplirFormulaire(username, password)
    });
    await test.step('l\'utilisateur clique sur le bouton de connexion', async () => {
        await loginPage.soumettreFormulaire()
    })
});

Then('la page de confirmation de connexion réussie est affichée', async ({ page }) => {
    const loginSuccessPage = new LoginSuccessPage(page);

    await test.step('le lien de la page de confirmation est conforme', async () => {
        await loginSuccessPage.verifierURL('https://practicetestautomation.com/logged-in-successfully/')
    });
    await test.step('Le titre de la page de confirmation est conforme', async () => {
        await expect(loginSuccessPage.getPageTitle()).toBeVisible()
    });
    await test.step('Le message de bienvenue est conforme', async () => {
        await expect(loginSuccessPage.getPageWelcome()).toBeVisible()
    });
    await test.step('Le bouton de déconnexion est visible', async () => {
        await expect(loginSuccessPage.getLogoutLink()).toBeVisible()
    })
});

Then('le message d\'erreur {string} est affiché', async ({ page }, erreur: string) => {
    const loginPage = new LoginPage(page);
    await test.step('le lien de la page de connexion ne change pas', async () => {
        await loginPage.verifierURL('https://practicetestautomation.com/practice-test-login/')
    });
    await test.step('l\'erreur de connexion est visible', async () => {
        await expect(loginPage.verifierMessageErreur()).toHaveText(erreur)
    })
});

Then('le champ mot de passe permet de masquer le texte saisi', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.verifierTypeChampMotDePasse()).toHaveAttribute('type', 'password')
})
