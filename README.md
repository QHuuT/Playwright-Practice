# Initialisation de projet de test automatisés - Playwright

- [ ] Installation [Node.js](https://nodejs.org/en/download)
  - [ ] Installation Python 
  - [ ] Installation Chocolatey
- [ ] Installation IDE
  - [ ] Plug-in : Gherkin
  - [ ] Plug-in : Cucumber
- [ ] Installation Playwright
- [ ] Installation Playwright-bdd
- [ ] Installation Allulre (Reporting)

---

## Install Node.js
Download Link : [Click here](https://nodejs.org/en/download)

- Npm is a very common and widely used package manager for JavaScript programming langage. It is contained in the Node.js installation process.
- Python and Chocolatey are installed as subproducts of Node.js but depending of your project it is not mandatory

Commands

    node --version  | Check which version of Node.js is currently installed
    npm --version   | Check which version of npm is currently installed

## Install an IDE

- Choose your own preferred IDE. I use [IntelliJ](https://www.jetbrains.com/fr-fr/idea/download/?section=windows) to work on this project.

## Recommanded plugins

| Name      | Description                                  |
|-----------|----------------------------------------------|
| Cucumber+ | Editing and running tests wrote with Gherkin |
| Gherkin   | Editing .feature files                       |
| Cucumber.js | Needed                                     | 

## Install Playwright

Create a folder and open it on your IDE
Install with command line

    npm init playwright@latest  | Install latest playwright version
    npx playwright --version    | Check which version of Playwright is installed 
    
### Playwright commands

    npx playwright test                       | Runs the end-to-end tests
    npx playwright test --ui                  | Runs the test in UI mode
    npx playwright test --project=chromium    | Runs the test only on Desktop Chrome
    npx playwright test filename              | Runs the test in a specific file
    npx playwright test --debug               | Runs the tests in debug mode
    npx playwright codegen                    | Auto generate tests with Codegen
    npx playwright --help                     | Give a list of Playwright commands

## Installation Playwright-bdd

Permet d'associer du code playwright à des phrases Gherkin, cucumber.

    npm install -D playwright-bdd             | If Playwright not already installed
    npm i -D playwright-bdd                   | If Playwright already installed

## About files

### package.json

It's the Node project management file.
- Should be kept in the root folder
- Information about the project
- List of dependencies. It lists the necessary libraries needed to run the project succesfully.

### playwright.config.ts

Configuration file of the project
- Should be kept in the root folder