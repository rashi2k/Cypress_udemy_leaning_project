const { defineConfig } = require("cypress");
//const fs = require('fs')
const { uniqueRandomCodeGeneratorTask } = require("./cypress/e2e/code_generator_task");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        uniqueRandomCodeGeneratorTask,
      })
    },
    downloadsFolder: "cypress/downloads",
    defaultCommandTimeout: 8000
  },
});
