Feature: Se déconnecter du le site "Practice Test Automation"
    En tant qu'utilisateur
    Je souhaite pouvoir me déconnecter du site
    Afin de mettre fin à ma session d'utilisation du site

    Background:
        Given l'utilisateur se trouve sur la page de connexion
        When l'utilisateur soumet un formulaire de connexion valide
        Then l'utilisateur est redirigé vers la page de confirmation de connexion réussie

    Scenario: Déconnexion - succès
        When l'utilisateur se déconnecte
        Then l'utilisateur est redirigé vers la page de connexion