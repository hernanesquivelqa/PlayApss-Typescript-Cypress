import { ILoginPage } from '../types/loginPage.interface';
require('dotenv').config();

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

  fillForm(username: string, password: string): void {
    if (!username) {
      throw new Error('Username parameter is required');
    }
    if (!password) {
      throw new Error('Password parameter is required');
    }
    this.usernameInput().type(username);
    this.passwordInput().type(password);
    this.submitForm().click();
  }
}