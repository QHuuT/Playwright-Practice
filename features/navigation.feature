Feature: Naviguer sur le site Test Automation Practice
    En tant qu'utilisateur
    Je souhaite pouvoir accéder aux différentes sections du site
    Afin d'utiliser ses différentes fonctionnalités

    Background:
        Given la page d'accueil est affichée

    Scenario Outline: Accéder aux différentes sections du site
        When l'utilisateur clique sur le lien "<lien>"
        Then la page "<page"> est affichée

        Examples:
            | lien     | page     | url                                          |
            | HOME     | Home     | https://practicetestautomation.com/          |
            | PRACTICE | Practice | https://practicetestautomation.com/practice/ |
            | COURSES  | Courses  | https://practicetestautomation.com/courses/  |
            | BLOG     | Blog     | https://practicetestautomation.com/blog/     |
            | CONTACT  | Contact  | https://practicetestautomation.com/contact/                                             |
