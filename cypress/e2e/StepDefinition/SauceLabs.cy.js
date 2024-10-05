/// <reference types="cypress" />
import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import { actions }from  "../../PageObject/PageActions/PageActions"
import { config } from '../../support/config';


Given('Je me rends sur le site SwagLabs', () => {
  actions.visitLoginPage();
});

When('Je saisis username et mot de passe valides et je clique sur le button login', () => {
  actions.login(config.username, config.password);
});

Then('La page des produits s\'affiche', () => {
  actions.verifyPageTitle('Swag Labs'); 
});

When('Je saisis le {string} et le {string}', (username, password) => {
  actions.login(username, password);
});

Then("un {string} s'affiche", (message_d_erreur) => {
  actions.verifyErrorMessage(message_d_erreur);
});

Given('Je suis connecté à SwagLabs', () => {
  actions.visitLoginPage();
  actions.login('standard_user', 'secret_sauce');
});

When('J\'ajoute le produit {string} au panier', (productName) => {
  actions.addItemToCart(productName);
});

Then('Le produit {string} est dans le panier', (productName) => {
  cy.get('.shopping_cart_badge').should('be.visible');
  cy.get('.shopping_cart_link').click();
  cy.contains('.inventory_item_name', productName).should('be.visible');
});

When('Je supprime le produit {string} du panier', (productName) => {
  actions.removeItemFromCart(productName);
});

Then('Le panier est vide', () => {
  actions.verifyCartEmpty();
});

When('Je vais au panier', () => {
  cy.get('.shopping_cart_link').click();
});

When('Je procède au checkout avec les informations {string}, {string}, {string}', (firstName, lastName, postalCode) => {
  actions.proceedToCheckout(firstName, lastName, postalCode);
});

Then('La commande est validée avec succès', () => {
  actions.verifyOrderSuccess();
});

When('Je clique sur le bouton Logout', () => {
  actions.logout();
});

Then('Je suis déconnecté et la page de login s\'affiche', () => {
  cy.get('#login-button').should('be.visible');
});
