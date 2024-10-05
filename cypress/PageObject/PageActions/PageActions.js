// cypress/support/actions.js
import { pageElements } from '../PageElement/WebElement';
import { config } from '../../support/config';

export const actions = {
  visitLoginPage() {
    cy.visit(config.url);
  },

  login(username, password) {
    console.log(`Tentative de connexion avec username: ${username} et mot de passe: ${password}`);
    if (username !== '') {
      cy.get(pageElements.usernameInput).type(username);
    }
    if (password !== '') {
      cy.get(pageElements.passwordInput).type(password);
    }
    cy.get(pageElements.loginButton).click();
  },

  addItemToCart(itemName) {
    cy.contains(itemName).parents(pageElements.inventoryItem).find('button').click();
  },

  removeItemFromCart(itemName) {
    cy.get(pageElements.shoppingCartLink).click();
    cy.contains(itemName).parents(pageElements.cartItem).find('button').click();
  },

  proceedToCheckout(firstName, lastName, postalCode) {
    cy.get(pageElements.checkoutButton).click();
    cy.get(pageElements.firstNameInput).type(firstName);
    cy.get(pageElements.lastNameInput).type(lastName);
    cy.get(pageElements.postalCodeInput).type(postalCode);
    cy.get(pageElements.continueButton).click();
    cy.get(pageElements.finishButton).click();
  },

  logout() {
    cy.get(pageElements.burgerMenuButton).click();
    cy.get(pageElements.logoutButton).click();
  },

  verifyOrderSuccess() {
    cy.contains('Thank you for your order!').should('be.visible');
  },

  verifyCartEmpty() {
    cy.get(pageElements.shoppingCartBadge).should('not.exist');
  },

  verifyPageTitle(expectedTitle) {
    cy.title().should('eq', expectedTitle);
  },

  verifyErrorMessage(expectedMessage) {
    cy.get(pageElements.errorMessage).should('contain', expectedMessage);
  },
};
