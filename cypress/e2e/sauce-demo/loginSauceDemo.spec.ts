import { LoginPage } from "../../support/pages/loginPage";

describe('Login Sauce Demo', () => {
  let page: LoginPage;
  const username = Cypress.env('USER_USERNAME');
  const password = Cypress.env('USER_PASSWORD');

  beforeEach('Setup', () => {
    if (!username || !password) {
      throw new Error('USER_USERNAME and USER_PASSWORD must be defined in Cypress environment variables');
    }
    page = new LoginPage();
 
  });

  it('TC1: Verify the loading of the login form', () => {
    cy.visit(page.url);
    page.boxForm().should('be.visible');
  });

  it('TC2: Verify a successful login with valid credentials', () => {
    cy.visit(page.url);
    page.fillForm(username, password);
    cy.url().should('include', '/inventory.html');
  });
});