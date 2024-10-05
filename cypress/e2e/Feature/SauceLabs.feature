Feature: Gestion des utilisateurs et des produits sur SwagLabs

  Background: 
    Given Je me rends sur le site SwagLabs

  Scenario: Connexion avec des identifiants valides
    When Je saisis username et mot de passe valides et je clique sur le button login 
    Then La page des produits s'affiche

  Scenario Outline: Connexion avec des identifiants invalides
    When Je saisis le <userName> et le <password>
    Then un <msgExpected> s'affiche
    Examples:
            | userName        | password     | msgExpected                                                               |
            |''                 |''             | 'Epic sadface: Username is required'                                        |
            |''                | 'secret_sauce' | 'Epic sadface: Username is required'                                       |
            | 'locked_out_user' |''              | 'Epic sadface: Password is required'                                        |
            | 'standard_user'   | 'mdp123'       | 'Epic sadface: Username and password do not match any user in this service' |
            | 'locked_out_user' | 'secret_sauce' | 'Epic sadface: Sorry, this user has been locked out.'                       |
            | 'locked_out_user' | 'secret_sauce' | 'Epic sadface: Sorry, this user has been locked out.'                       |

  Scenario: Ajout d'un produit au panier
    Given Je suis connecté à SwagLabs
    When J'ajoute le produit "Sauce Labs Backpack" au panier
    Then Le produit "Sauce Labs Backpack" est dans le panier

  Scenario: Suppression d'un produit du panier
    Given Je suis connecté à SwagLabs
    And J'ajoute le produit "Sauce Labs Backpack" au panier
    When Je supprime le produit "Sauce Labs Backpack" du panier
    Then Le panier est vide

  Scenario: Procéder au checkout
    Given Je suis connecté à SwagLabs
    And J'ajoute le produit "Sauce Labs Backpack" au panier
    When Je vais au panier
    And Je procède au checkout avec les informations "John", "Doe", "12345"
    Then La commande est validée avec succès

  Scenario: Déconnexion de l'utilisateur
    Given Je suis connecté à SwagLabs
    When Je clique sur le bouton Logout
    Then Je suis déconnecté et la page de login s'affiche
