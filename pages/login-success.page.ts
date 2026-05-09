import {expect, Page} from '@playwright/test';
import { HomePage } from './home.page';

export class LoginSuccessPage extends HomePage {

    private loginTitle = this.page.getByText('Logged In Successfully');
    private pageWelcome = this.page.getByText('Congratulations student. You successfully logged in!');
    private logoutLink = this.page.getByRole('link', { name : 'Log out' })

    constructor(page: Page) {
        super(page);
    }

    async verifierURL(url: string) {
        await expect(this.page).toHaveURL(url);
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