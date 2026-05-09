# Initialisation de projet de test automatisés - Playwright

## Checklist rapide

- [ ] Installation [Node.js](https://nodejs.org/en/download)
  - [ ] Installation Python 
  - [ ] Installation Chocolatey
- [ ] Installation IDE
  - [ ] Plug-in : Gherkin
  - [ ] Plug-in : Cucumber
- [ ] Installation Playwright
- [ ] Installation Playwright-bdd
- [ ] Installation Allure (Reporting)
- [ ] Bonnes pratiques : Page Object Model

## Mise en place du projet

### Installer Node.js, npm, python

Node.js est un environnement d'exécution JavaScript — il permet de faire tourner du JavaScript en dehors du navigateur, sur ta machine.

Lien de téléchargement : [Click here](https://nodejs.org/en/download)

- Npm est un gestionnaire de paquet dédié au langage de programmation JavaScript. 
Cela permet d'installer des bibliothèques et outils JavaScript.
A installer obligatoirement
Il est inclus dans le processus d'istallation de Node.js.

Commandes

    node --version  | Vérifier quelle est la version de Node installée
    npm --version   | Vérifier quelle est la version de npm installée

- Chocolatey est un gestionnaire de paquets pour Windows. 
Cela permet d'installer des logiciels en ligne de commande mais n'est pas forcément obligatoire selon les projets. 
Il est inclus dans le processus d'installation de Node.js.

- Python est un langage de programmation qui est nécessaire comme dépendance puor certains paquets npm pour compiler
du code natif. Si l'on ne compte pas coder en Python, on doit l'installer mais on ne s'en préoccupe pas.

### Installer un environnement de développement

- Choisir son environnement de développement préféré et l'installer.

#### Plugin recommandés

| Nom          | Description                                                                                                                                |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Gherkin      | Coloration syntaxique des fichiers .feature                                                                                                |
| Cucumber.js  | Navigation et résolution des steps pour les projets JavaScript/TypeScript                                                                  | 
| Cucumber+    | Version améliorée qui combine les deux avec des fonctionnalités supplémentaires comme l'autocomplétion et la détection des steps manquants |

### Install Playwright

C'est un framework d'automatisation de navigateur développé par Microsoft. 
Il permet de contrôler un navigateur (Chrome, Firefox, Safari) via du code pour simuler les actions d'un utilisateur

Commandes d'installation : 

    npm init playwright@latest  | Installer la dernière version de PlayWright
    npx playwright --version    | Vérifier quelle version de PlayWright est installée
    
Commandes à utiliser : 

    npx playwright test         | Exécute les tests
    * --ui                      | Exécute les tests en mode UI
    * --project=chromium        | Exécute les tests seulement Desktop Chrome
    * filename                  | Exécute les tests d'un fichier spécifique
    * --debug                   | Exécute les tests en mode debug
    npx playwright codegen      | Génère des tests avec l'IA
    npx playwright --help       | Rappel des commandes PlayWright

### Installation Playwright-bdd

C'est une surcouche de Playwright qui permet d'écrire les tests en Gherkin (Given/When/Then) au lieu d'écrire directement du code TypeScript.

    npm install -D playwright-bdd             | Si PlayWright n'est pas déjà installé
    npm i -D playwright-bdd                   | Si PlayWright est déjà installé

### Installation Allure

Permet de générer un reporting amélioré par rapport à l'outil de reporting par défaut

    npm install allure-playwright

Il faut ensuite modifier le fichier playwright.config.ts

    export default defineConfig(
        {
            reporter: [
            ['html'],
            ['allure-playwright'] // reporter dédié BDD
            ]
        }

Configuration spécifique : 

Commande `npm test:report`

    ```bash
    A ajouter dans package.json
      
    "scripts": {
        "test:report": rmdir /s /q allure-results & rmdir /s /q allure-report & npx bddgen && npx playwright test && npx allure generate allure-results && npx allure open
    }
    ```

| Commande | Description |
|---|---|
| `rmdir /s /q allure-results` | Supprime le dossier `allure-results` et tout son contenu sans demander de confirmation |
| `rmdir /s /q allure-report` | Supprime le dossier `allure-report` et tout son contenu sans demander de confirmation |
| `npx bddgen` | Génère les fichiers de test Playwright à partir des fichiers `.feature` |
| `npx playwright test` | Lance tous les tests Playwright et génère les résultats bruts dans `allure-results` |
| `npx allure generate allure-results` | Transforme les résultats bruts de `allure-results` en rapport HTML dans `allure-report` |
| `npx allure open` | Ouvre le rapport HTML dans le navigateur |

Commandes utiles : 

    npx allure generate allure-results  | Générer le rapport
    npx allure open                     | Ouvrir le rapport

## Page Object Model

Le Page Object Model est un **design pattern** de test qui consiste à créer une classe par page de l'application. Chaque classe centralise les sélecteurs et les actions disponibles sur cette page.

### Structure

    pages/
    ├── login.page.ts       ← tout ce qui concerne la page de login
    ├── dashboard.page.ts   ← tout ce qui concerne le dashboard

### Composition d'un Page Object

Un Page Object est composé de deux éléments :

**1. Les sélecteurs** — les éléments de la page avec lesquels on interagit :

```typescript
private usernameField = this.page.getByLabel('username');
private passwordField = this.page.getByLabel('password');
private submitButton = this.page.getByRole('button', { name: 'Submit' });
```

**2. Les actions** — les interactions qu'un utilisateur peut effectuer sur la page :

```typescript
async connecter(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
}
```

### Flux d'exécution

    .feature → steps → Page Object → Playwright

- Le `.feature` décrit **quoi** tester (vision métier)
- Le step décrit **quel Page Object** utiliser
- Le Page Object décrit **comment** interagir avec la page
- Playwright **exécute** les actions sur le navigateur

### Bénéfices

| Sans POM | Avec POM |
|---|---|
| Sélecteurs dupliqués dans chaque step | Sélecteurs centralisés dans la classe |
| Modification dans N fichiers si un sélecteur change | Modification dans 1 seul fichier |
| Logique technique mélangée aux steps | Séparation claire des responsabilités |
| Code difficile à maintenir | Code réutilisable et maintenable |

### Exemple concret

Sans POM, si le bouton "Submit" change de nom, il faut modifier **tous les steps** qui l'utilisent. Avec le POM, on ne modifie que la classe `LoginPage` et tous les tests sont automatiquement mis à jour.