Feature: Se déconnecter du le site "Practice Test Automation"
    En tant qu'utilisateur
    Je souhaite pouvoir me déconnecter du site
    Afin de mettre fin à ma session d'utilisation du site

    Background:
        Given l'utilisateur est connecté

    Scenario: Déconnexion - succès
        When l'utilisateur se déconnecte
        Then la page de connexion est affichée