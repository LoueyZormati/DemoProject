const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  env: {
    
    
  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'SAUCE DEMO HTML-Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    quiet:true,
    debug:true
  },

  e2e: {
      setupNodeEvents(on, config) {
        screenshotOnRunFailure=true
        require('cypress-mochawesome-reporter/plugin')(on),
        // implement node event listeners here
        on('file:preprocessor', cucumber())
      },
    baseUrl: "https://www.saucedemo.com", // Base URL pour vos tests
    specPattern: "cypress/e2e/Feature/**/*.feature",
  },

});