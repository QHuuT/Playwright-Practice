import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginSuccessPage extends BasePage {

    private loginTitle = this.page.getByText('Logged In Successfully');
    private pageWelcome = this.page.getByText('Congratulations student. You successfully logged in!');
    private logoutLink = this.page.getByRole('link', { name : 'Log out' })

    constructor(page: Page) {
        super(page);
    }

    getPageTitle() {
        return this.loginTitle;
    }

    getPageWelcome() {
        return this.pageWelcome;
    }

    getLogoutLink() {
        return this.logoutLink;
    }

    async seDeconnecter() {
        await this.logoutLink.click()
    }
}