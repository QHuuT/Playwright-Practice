# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features\test-login.feature.spec.js >> Se connecter sur le site "Practice Test Automation" >> Se connecter - cas non passants >> Example #3
- Location: .features-gen\features\test-login.feature.spec.js:27:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#error')
Expected: "Your password is invalid"
Received: "Your password is invalid!"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#error')
    9 × locator resolved to <div id="error" class="show">Your password is invalid!</div>
      - unexpected value "Your password is invalid!"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Press \"Enter\" to skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-container"
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - generic:
          - navigation
      - link "Practice Test Automation" [ref=e10] [cursor=pointer]:
        - /url: https://practicetestautomation.com/
        - img "Practice Test Automation" [ref=e11]
      - navigation [ref=e16]:
        - navigation [ref=e17]:
          - list [ref=e18]:
            - listitem [ref=e19]:
              - link "Home" [ref=e20] [cursor=pointer]:
                - /url: https://practicetestautomation.com/
            - listitem [ref=e21]:
              - link "Practice" [ref=e22] [cursor=pointer]:
                - /url: https://practicetestautomation.com/practice/
            - listitem [ref=e23]:
              - link "Courses" [ref=e24] [cursor=pointer]:
                - /url: https://practicetestautomation.com/courses/
            - listitem [ref=e25]:
              - link "Blog" [ref=e26] [cursor=pointer]:
                - /url: https://practicetestautomation.com/blog/
            - listitem [ref=e27]:
              - link "Contact" [ref=e28] [cursor=pointer]:
                - /url: https://practicetestautomation.com/contact/
    - main [ref=e29]:
      - generic [ref=e30]:
        - heading "Test login" [level=2] [ref=e31]
        - list [ref=e32]:
          - listitem [ref=e33]: This is a simple Login page. Students can use this page to practice writing simple positive and negative LogIn tests. Login functionality is something that most of the test automation engineers need to automate.
          - listitem [ref=e34]:
            - text: "Use next credentials to execute Login:"
            - text: "Username: student"
            - text: "Password: Password123"
        - generic [ref=e35]:
          - generic [ref=e36]:
            - text: Username
            - textbox "Username" [ref=e37]
          - generic [ref=e38]:
            - text: Password
            - textbox "Password" [ref=e39]
          - button "Submit" [active] [ref=e40] [cursor=pointer]
        - generic [ref=e41]: Your password is invalid!
        - separator [ref=e42]
        - 'heading "Test case 1: Positive LogIn test" [level=5] [ref=e43]'
        - list [ref=e44]:
          - listitem [ref=e45]: Open page
          - listitem [ref=e46]: Type username student into Username field
          - listitem [ref=e47]: Type password Password123 into Password field
          - listitem [ref=e48]: Push Submit button
          - listitem [ref=e49]: Verify new page URL contains practicetestautomation.com/logged-in-successfully/
          - listitem [ref=e50]: Verify new page contains expected text ('Congratulations' or 'successfully logged in')
          - listitem [ref=e51]: Verify button Log out is displayed on the new page
        - separator [ref=e52]
        - 'heading "Test case 2: Negative username test" [level=5] [ref=e53]'
        - list [ref=e54]:
          - listitem [ref=e55]: Open page
          - listitem [ref=e56]: Type username incorrectUser into Username field
          - listitem [ref=e57]: Type password Password123 into Password field
          - listitem [ref=e58]: Push Submit button
          - listitem [ref=e59]: Verify error message is displayed
          - listitem [ref=e60]: Verify error message text is Your username is invalid!
        - separator [ref=e61]
        - 'heading "Test case 3: Negative password test" [level=5] [ref=e62]'
        - list [ref=e63]:
          - listitem [ref=e64]: Open page
          - listitem [ref=e65]: Type username student into Username field
          - listitem [ref=e66]: Type password incorrectPassword into Password field
          - listitem [ref=e67]: Push Submit button
          - listitem [ref=e68]: Verify error message is displayed
          - listitem [ref=e69]: Verify error message text is Your password is invalid!
    - contentinfo:
      - generic [ref=e71]:
        - text: © Copyright 2020
        - link "Practice Test Automation." [ref=e72] [cursor=pointer]:
          - /url: https://practicetestautomation.com/
        - text: All rights reserved |
        - link "Privacy Policy" [ref=e73] [cursor=pointer]:
          - /url: https://practicetestautomation.com/privacy-policy/
```

# Test source

```ts
  1  | import { createBdd } from "playwright-bdd";
  2  | import { test, expect } from "@playwright/test";
  3  | 
  4  | const { Given, When, Then } = createBdd();
  5  | 
  6  | Given('l\'utilisateur est sur la page de connexion', async ({ page }) => {
  7  |     await test.step('l\'utilisateur se rend sur le site "Practice Test Automation"', async () => {
  8  |         await page.goto("https://practicetestautomation.com/practice-test-login/")
  9  |     })
  10 | });
  11 | 
  12 | When('l\'utilisateur soumet un formulaire de connexion valide', async ({ page }) => {
  13 |     await test.step('l\'utilisateur saisit le nom d\'utilisateur', async () => {
  14 |         await page.getByLabel('username').fill('student')
  15 |     });
  16 |     await test.step('l\'utilisateur saisit le mot de passe', async () => {
  17 |         await page.getByLabel('password').fill('Password123')
  18 |     });
  19 |     await test.step('l\'utilisateur clique sur le bouton de connexion"', async () => {
  20 |         await page.getByRole('button', { name: 'Submit'}).click()
  21 |     })
  22 | });
  23 | 
  24 | When('l\'utilisateur soumet un formulaire de connexion invalide : {string}', async ({ page }, cas: string) => {
  25 |     const identifiants = {
  26 |         "Nom d'utilisateur vide": { username: '', password: 'Password123' },
  27 |         "Nom d'utilisateur incorrect": { username: 'incorrectUsername', password: 'Password123' },
  28 |         "Mot de passe vide": { username: 'student', password: '' },
  29 |         "Mot de passe incorrect": { username: 'student', password: 'incorrectPassword' }
  30 |     }
  31 |     const { username, password } = identifiants[cas];
  32 | 
  33 |     await test.step('l\'utilisateur saisit le nom d\'utilisateur', async () => {
  34 |         await page.getByLabel('username').fill(username)
  35 |     });
  36 |     await test.step('l\'utilisateur saisit le mot de passe', async () => {
  37 |         await page.getByLabel('password').fill(password)
  38 |     });
  39 |     await test.step('l\'utilisateur clique sur le bouton de connexion"', async () => {
  40 |         await page.getByRole('button', { name: 'Submit'}).click()
  41 |     })
  42 | });
  43 | 
  44 | Then('l\'utilisateur est redirigé vers une page de confirmation de la connexion réussie', async ({ page }) => {
  45 |     await test.step('le lien de la page de confirmation est conforme', async () => {
  46 |         await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/')
  47 |     });
  48 |     await test.step('Le titre de la page de confirmation est conforme', async () => {
  49 |         await expect(page.getByText('Logged In Successfully')).toBeVisible()
  50 |     });
  51 |     await test.step('Le message de bienvenue est conforme', async () => {
  52 |         await expect(page.getByText('Congratulations student. You successfully logged in!')).toBeVisible()
  53 |     });
  54 |     await test.step('Le bouton de déconnexion est visible', async () => {
  55 |         await expect(page.getByRole('link', { name: 'Log out' }), "Le bouton de déconnexion est visible").toBeVisible()
  56 |     })
  57 | });
  58 | 
  59 | Then('le message d\'erreur {string} est affiché', async ({ page }, erreur: string) => {
  60 |     await test.step('l\'url de la page de connexion ne change pas', async () => {
  61 |         await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/')
  62 |     });
  63 |     await test.step('l\'erreur de connexion est visible', async () => {
  64 |         await expect(page.locator('#error')).toHaveText(erreur)
  65 |     })
  66 | })
     |                                                     ^ Error: expect(locator).toHaveText(expected) failed
```