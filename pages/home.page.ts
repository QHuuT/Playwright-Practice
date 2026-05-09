import { Page, expect } from '@playwright/test';

// Classe de base dont héritent tous les Page Objects
// Centralise les méthodes communes à toutes les pages
export class HomePage {

    private logoImage = this.page.getByAltText('Practice Test Automation');
    private homeTitle = this.page.getByText('Hello');
    private menuHomeLink = this.page.getByRole('link', { name : 'Home' })
    private menuPracticeLink = this.page.getByRole('link', { name : 'Practice' })
    private menuCoursesLink = this.page.getByRole('link', { name : 'Courses' })
    private menuBlogLink = this.page.getByRole('link', { name : 'Blog' })
    private menuContactLink = this.page.getByRole('link', { name : 'Contact' })

    // Constructeur — reçoit l'objet page de Playwright
    // "protected" permet aux classes enfants (LoginPage, etc.) d'accéder à this.page
    constructor(protected page: Page) {}

    // Vérifie que l'URL courante correspond à l'URL attendue
    // Utilisable depuis n'importe quel Page Object qui étend HomePage
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