const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Ajouter le support pour le préprocesseur Cucumber
      on("file:preprocessor", cucumber());
      // Vous pouvez ajouter d'autres écouteurs d'événements ici
    },
    baseUrl: "https://www.saucedemo.com", // Base URL pour vos tests
    specPattern: "cypress/e2e/Feature/**/*.feature",
  },
});