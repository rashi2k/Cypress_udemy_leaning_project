 const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    downloadsFolder: "cypress/downloads",
    defaultCommandTimeout: 8000
  },
});
