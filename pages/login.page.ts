import { Page } from '@playwright/test';
import { HomePage } from './home.page';

// LoginPage hérite de BasePage — elle dispose de toutes ses méthodes communes
// comme verifierURL()
export class LoginPage extends HomePage {

    // Sélecteurs — éléments de la page de login
    // Déclarés en private : accessibles uniquement depuis cette classe
    private usernameField = this.page.getByLabel('username');
    private passwordField = this.page.getByLabel('password');
    private submitButton = this.page.getByRole('button', { name: 'Submit' });
    private errorMessage = this.page.locator('#error'); // ciblé par son id HTML

    // Constructeur — reçoit l'objet page de Playwright
    // super(page) initialise le constructeur de BasePage avec l'objet page
    constructor(page: Page) {
        super(page);
    }

    // Remplit les champs username et password avec les valeurs fournies en paramètre
    async remplirFormulaire(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
    }

    // Clique sur le bouton Submit pour soumettre le formulaire
    async soumettreFormulaire() {
        await this.submitButton.click();
    }

    // Retourne le locator du message d'erreur
    // Pas d'await — on retourne le locator, l'assertion est faite dans le step
    verifierMessageErreur() {
        return this.errorMessage;
    }

    // Retourne le locator du champ mot de passe
    // Utilisé pour vérifier que le champ est bien de type "password"
    verifierTypeChampMotDePasse() {
        return this.passwordField;
    }
}