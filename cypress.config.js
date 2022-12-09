const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 80000,
    baseUrl: "https://gallery-app.vivifyideas.com/"
  },
});
