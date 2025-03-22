import { LoginPage } from "../../support/pages/loginPage";
describe('Login Sauce Demo', () => {
  let page: LoginPage;
  beforeEach('Setup', () => {
    page = new LoginPage();
    cy.visit(page.url);
  });
  it('TC1: Verify the loading of the login form', () => {
    page.boxForm().should('be.visible');
  });
  it.skip('TC2:Verify a successful login with valid credentials', () => {
    page.fillForm();
    cy.url().should('include', '/inventory.html');
  });
});
