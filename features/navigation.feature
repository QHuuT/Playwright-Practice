Feature: Naviguer sur le site Test Automation Practice
    En tant qu'utilisateur
    Je souhaite pouvoir accéder aux différentes sections du site
    Afin d'utiliser ses différentes fonctionnalités

    Background:
        Given l'utilisateur se trouve sur la page d'accueil

    Scenario Outline: Accéder aux différentes sections du site
        When l'utilisateur se rend sur la page "<lien>"
        Then la page "<url>" est affichée

        Examples:
            | lien     | nomPage  | url                                          |
            | HOME     | Home     | https://practicetestautomation.com/          |
            | PRACTICE | Practice | https://practicetestautomation.com/practice/ |
            | COURSES  | Courses  | https://practicetestautomation.com/courses/  |
            | BLOG     | Blog     | https://practicetestautomation.com/blog/     |
            | CONTACT  | Contact  | https://practicetestautomation.com/contact/  |
