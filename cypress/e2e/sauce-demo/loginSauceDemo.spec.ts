import { LoginPage } from "../../support/pages/loginPage";

describe('Login Sauce Demo', () => {
  let page: LoginPage;
  const username = Cypress.env('USER_USERNAME');
  const password = Cypress.env('USER_PASSWORD')

  beforeEach('Setup', () => {
    page = new LoginPage();
 
  });

  it.skip('TC1: Verify the loading of the login form', () => {
    cy.visit(page.url);
    page.boxForm().should('be.visible');
  });

  it.skip('TC2: Verify a successful login with valid credentials', () => {
    cy.visit(page.url);
    page.fillForm(username, password);
    cy.url().should('include', '/inventory.html');
  });
});