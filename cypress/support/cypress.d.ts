/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
      generateRandomAmount(): Chainable<number>;
    }
  }