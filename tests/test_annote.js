// 📦 On importe les outils dont on a besoin depuis la bibliothèque Playwright
// "test"   → permet de déclarer un test
// "expect" → permet de vérifier qu'un résultat est bien celui attendu
const {test, expect} = require('@playwright/test')

// 🧪 On déclare un test et on lui donne un nom : "My first test"
// "async" signifie que le test peut attendre que des choses se passent (chargement de page, etc.)
// "page" est un outil magique qui représente un onglet de navigateur, prêt à être contrôlé
test('My first test', async ({page}) => {

    // 🌐 On demande à la "page" (notre onglet virtuel) de naviguer vers une adresse web
    // C'est l'équivalent de taper "https://google.com" dans la barre d'adresse de ton navigateur
    // "await" signifie : "attends que la page soit bien chargée avant de continuer"
    await page.goto('https://google.com')

    // ✅ On vérifie que le titre de la page est bien "Google"
    // C'est le texte qu'on voit dans l'onglet du navigateur
    // Si le titre est différent, le test échoue ❌
    await expect(page).toHaveTitle('Google')

}) // 🔚 Fin du test