import { createBdd } from "playwright-bdd";
import { test, expect } from "@playwright/test";

const { Given, When, Then } = createBdd();

Given('l\'utilisateur est sur la page de connexion', async ({ page }) => {
    await test.step('l\'utilisateur se rend sur le site "Practice Test Automation"', async () => {
        await page.goto("https://practicetestautomation.com/practice-test-login/")
    })
});

When('l\'utilisateur soumet un formulaire de connexion valide', async ({ page }) => {
    await test.step('l\'utilisateur saisit le nom d\'utilisateur', async () => {
        await page.getByLabel('username').fill('student')
    });
    await test.step('l\'utilisateur saisit le mot de passe', async () => {
        await page.getByLabel('password').fill('Password123')
    });
    await test.step('l\'utilisateur clique sur le bouton de connexion"', async () => {
        await page.getByRole('button', { name: 'Submit'}).click()
    })
});

When('l\'utilisateur soumet un formulaire de connexion invalide : {string}', async ({ page }, cas: string) => {
    const identifiants = {
        "Nom d'utilisateur vide": { username: '', password: 'Password123' },
        "Nom d'utilisateur incorrect": { username: 'incorrectUsername', password: 'Password123' },
        "Mot de passe vide": { username: 'student', password: '' },
        "Mot de passe incorrect": { username: 'student', password: 'incorrectPassword' }
    }
    const { username, password } = identifiants[cas];

    await test.step('l\'utilisateur saisit le nom d\'utilisateur', async () => {
        await page.getByLabel('username').fill(username)
    });
    await test.step('l\'utilisateur saisit le mot de passe', async () => {
        await page.getByLabel('password').fill(password)
    });
    await test.step('l\'utilisateur clique sur le bouton de connexion"', async () => {
        await page.getByRole('button', { name: 'Submit'}).click()
    })
});

Then('l\'utilisateur est redirigé vers une page de confirmation de la connexion réussie', async ({ page }) => {
    await test.step('le lien de la page de confirmation est conforme', async () => {
        await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/')
    });
    await test.step('Le titre de la page de confirmation est conforme', async () => {
        await expect(page.getByText('Logged In Successfully')).toBeVisible()
    });
    await test.step('Le message de bienvenue est conforme', async () => {
        await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible()
    });
    await test.step('Le bouton de déconnexion est visible', async () => {
        await expect(page.getByRole('link', { name: 'Log out' }), "Le bouton de déconnexion est visible").toBeVisible()
    })
});

Then('le message d\'erreur {string} est affiché', async ({ page }, erreur: string) => {
    await test.step('l\'e lien de la page de connexion ne change pas', async () => {
        await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/')
    });
    await test.step('l\'erreur de connexion est visible', async () => {
        await expect(page.locator('#error')).toHaveText(erreur)
    })
});

Then('le champ mot de passe permet de masquer le texte saisi', async ({ page }) => {
    await expect(page.getByLabel('password')).toHaveAttribute('type', 'password')
})