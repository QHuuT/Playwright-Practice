import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// Définition de la configuration BDD :
// - features : chemin vers les fichiers Gherkin (.feature)
// - steps : chemin vers les fichiers de définition des steps (.ts)
const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'steps/*.ts',
});

export default defineConfig({
  // Dossier contenant les tests générés par bddgen
  testDir,

  // Lancer tous les tests en parallèle pour accélérer l'exécution
  fullyParallel: true,

  // Interdire les tests marqués `.only` en CI pour éviter d'oublier de les retirer
  forbidOnly: !!process.env.CI,

  // Rejouer les tests en échec : 2 fois en CI, jamais en local
  retries: process.env.CI ? 2 : 0,

  // Nombre de workers parallèles : 1 en CI pour stabilité, automatique en local
  workers: process.env.CI ? 1 : undefined,

  // Reporters : génèrent les rapports de test après exécution
  reporter: [
    ['html'],             // Rapport HTML natif Playwright (playwright-report/)
    ['allure-playwright'] // Rapport Allure avec vue orientée BDD (allure-results/)
  ],

  use: {
    // Enregistre une trace (actions, screenshots, réseau) uniquement lors du premier retry
    // Utile pour diagnostiquer les échecs sans surcharger le disque
    trace: 'on-first-retry',

    // Timeout maximum pour les navigations (goto, waitForURL...)
    navigationTimeout: 15000,

    // Timeout maximum pour les actions (click, fill, toBeVisible...)
    actionTimeout: 10000,
  },

  projects: [
    // Navigateurs sur lesquels les tests sont exécutés
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // Simule Chrome sur desktop
    },
    // Firefox et Safari désactivés pour l'instant
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
});