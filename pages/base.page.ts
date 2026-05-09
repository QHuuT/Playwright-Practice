import { Page, expect } from '@playwright/test';

// Classe de base dont héritent tous les Page Objects
// Centralise les méthodes communes à toutes les pages
export class BasePage {

    private logoImage = this.page.getByAltText('Practice Test Automation');
    private homeTitle = this.page.getByText('Hello')

    // Constructeur — reçoit l'objet page de Playwright
    // "protected" permet aux classes enfants (LoginPage, etc.) d'accéder à this.page
    constructor(protected page: Page) {}

    // Vérifie que l'URL courante correspond à l'URL attendue
    // Utilisable depuis n'importe quel Page Object qui étend BasePage
    async verifierURL(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async clicLogoImage() {
        await this.logoImage.click();
    }

    getHomeTitle() {
        return this.homeTitle
    }
}