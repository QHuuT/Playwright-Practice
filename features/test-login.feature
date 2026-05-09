Feature: Se connecter sur le site "Practice Test Automation"
    En tant qu'utilisateur
    Je souhaite pouvoir me connecter au site à l'aide de mes identifiants
    Afin de pouvoir accéder à l'ensemble des fonctionnalités du site

    Background:
        Given l'utilisateur est sur la page de connexion

    Scenario: Se connecter - cas passants
        When l'utilisateur soumet un formulaire de connexion valide
        Then la page de confirmation de connexion réussie est affichée

    Scenario Outline: Se connecter - cas non passants
        When l'utilisateur soumet un formulaire de connexion invalide : "<cas>"
        Then le message d'erreur "<erreur>" est affiché

        Examples:
            | cas                         | username          | password          | erreur                    |
            | Nom d'utilisateur vide      |                   | Password123       | Your username is invalid! |
            | Nom d'utilisateur incorrect | incorrectUsername | Password123       | Your username is invalid! |
            | Mot de passe vide           | student           |                   | Your password is invalid! |
            | Mot de passe incorrect      | student           | incorrectPassword | Your password is invalid! |

    Scenario: La saisie du mot de passe est masquée
        Then le champ mot de passe permet de masquer le texte saisi

    Scenario: Retour sur la page d'accueil
        When l'utilisateur clique sur le logo du site
        Then la page d'accueil est affichée

