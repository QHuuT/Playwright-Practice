import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// 1. On définit la configuration BDD ici
const testDir = defineBddConfig({
  features: 'features/*.feature', // Chemin vers vos fichiers .feature
  steps: 'steps/*.ts',           // Chemin vers vos fichiers .ts de code
});

export default defineConfig({
  // 2. On remplace './test-practice' par la variable testDir
  testDir,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright'] // reporter dédié BDD
  ],
  use: {
    trace: 'on-first-retry',
    navigationTimeout: 15000, // 15s pour la navigation
    actionTimeout: 10000,     // 10s pour les actions
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
/*    {
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