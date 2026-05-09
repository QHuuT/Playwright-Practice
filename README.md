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

## Installation Allure

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

Commandes utiles : 

    npx allure generate allure-results  | Générer le rapport
    npx allure open                     | Ouvrir le rapport