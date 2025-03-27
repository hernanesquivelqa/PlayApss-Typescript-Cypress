import { defineConfig } from 'cypress';
require('dotenv').config();
export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,ts}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env.USER_PASSWORD = process.env.CYPRESS_USER_PASSWORD;
      config.env.USER_USERNAME = process.env.CYPRESS_USER_USERNAME;
      return config;
    },
  },
});
