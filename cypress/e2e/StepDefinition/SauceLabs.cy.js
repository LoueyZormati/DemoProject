/// <reference types="cypress" />
import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { actions } from "../../PageObject/PageActions/PageActions";
import { config } from '../../support/config';


Given('Je me rends sur le site SwagLabs', () => {
  actions.visitLoginPage();
  // Ajoute une attente pour vérifier que la page est bien chargée
  cy.url().should('include', 'saucedemo');
  cy.get('#login-button').should('be.visible');
});

When('Je saisis username et mot de passe valides et je clique sur le button login', () => {
  actions.login(config.username, config.password);
  cy.wait(1000); // Attente pour s'assurer que la redirection a lieu
});

Then('La page des produits s\'affiche', () => {
  actions.verifyPageTitle('Swag Labs');
  cy.get('.inventory_list').should('be.visible'); // Vérification que la page est bien chargée
});

When('Je saisis le {string} et le {string}', (username, password) => {
  actions.login(username, password);
  cy.wait(1000); // Attente pour laisser la validation se faire
});

Then("un {string} s'affiche", (message_d_erreur) => {
  actions.verifyErrorMessage(message_d_erreur);
  cy.get('.error-message-container').should('contain', message_d_erreur);
});

Given('Je suis connecté à SwagLabs', () => {
  actions.visitLoginPage();
  actions.login('standard_user', 'secret_sauce');
  cy.url().should('include', '/inventory'); // Vérifie que la connexion a réussi
});

When('J\'ajoute le produit {string} au panier', (productName) => {
  actions.addItemToCart(productName);
  cy.wait(1000); // Laisse du temps pour l'ajout du produit au panier
});

Then('Le produit {string} est dans le panier', (productName) => {
  cy.get('.shopping_cart_badge').should('be.visible'); // Vérifie que l'icône du panier est bien mise à jour
  cy.get('.shopping_cart_link').click();
  cy.contains('.inventory_item_name', productName).should('be.visible');
});

When('Je supprime le produit {string} du panier', (productName) => {
  cy.wait(2000); // Attente avant l'action
  actions.removeItemFromCart(productName);
  cy.wait(2000); // Attente après la suppression pour s'assurer que l'état est mis à jour
});

Then('Le panier est vide', () => {
  actions.verifyCartEmpty();
  cy.get('.shopping_cart_badge').should('not.exist'); // Vérifie que le panier est vide
});

When('Je vais au panier', () => {
  cy.get('.shopping_cart_link').click();
  cy.wait(1000); // Attente pour laisser le temps à la page de se charger
});

When('Je procède au checkout avec les informations {string}, {string}, {string}', (firstName, lastName, postalCode) => {
  actions.proceedToCheckout(firstName, lastName, postalCode);
  cy.wait(1000); // Attente pour s'assurer que le formulaire est soumis
});

Then('La commande est validée avec succès', () => {
  actions.verifyOrderSuccess();
  cy.get('.complete-header').should('contain', 'Thank you for your order!'); // Vérifie que le message de succès est affiché
});

When('Je clique sur le bouton Logout', () => {
  actions.logout();
  cy.wait(1000); // Attente pour laisser le temps à la déconnexion de se faire
});

Then('Je suis déconnecté et la page de login s\'affiche', () => {
  cy.get('#login-button').should('be.visible');
  cy.url().should('include', 'saucedemo'); // Vérifie que la redirection vers la page de login a bien lieu
});
