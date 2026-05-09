import { Page, expect } from '@playwright/test';

// Classe de base dont héritent tous les Page Objects
// Centralise les méthodes communes à toutes les pages
export class HomePage {

    private logoImage = this.page.getByAltText('Practice Test Automation');
    private homeTitle = this.page.getByText('Hello');
    private menuHomeLink = this.page.locator('nav').getByRole('link', { name : 'Home', exact: true })
    private menuPracticeLink = this.page.locator('nav').getByRole('link', { name : 'Practice', exact: true })
    private menuCoursesLink = this.page.locator('nav').getByRole('link', { name : 'Courses', exact: true })
    private menuBlogLink = this.page.locator('nav').getByRole('link', { name : 'Blog', exact: true })
    private menuContactLink = this.page.locator('nav').getByRole('link', { name : 'Contact', exact: true })

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

    async clicMenuLink(lien: 'Home' | 'Practice' | 'Courses' | 'Blog' | 'Contact') {
        const liens = {
            'Home': this.menuHomeLink,
            'Practice': this.menuPracticeLink,
            'Courses': this.menuCoursesLink,
            'Blog': this.menuBlogLink,
            'Contact': this.menuContactLink
        }
        await liens[lien].click();
    }

    getHomeTitle() {
        return this.homeTitle
    }
}