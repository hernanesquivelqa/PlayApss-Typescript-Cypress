import { ILoginPage } from '../types/loginPage.interface';

export class LoginPage implements ILoginPage {
  url: string;
  boxForm: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
  usernameInput: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
  passwordInput: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
  submitForm: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
  constructor() {
    this.url = 'https://www.saucedemo.com/';
    this.boxForm = () => cy.get('#login_button_container.form_column');
    this.usernameInput = () => cy.get('input[data-test="username"]');
    this.passwordInput = () => cy.get('input[data-test="password"]');
    this.submitForm = () => cy.get('input[type="submit"]');
  }

  fillForm(): void {
    this.usernameInput().click().type('standard_user');
    this.passwordInput().click().type('secret_sauce');
    this.submitForm().click();
  }
}
