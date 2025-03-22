import { ILoginPage } from '../types/loginPage.interface';
import * as dotenv from "dotenv";
dotenv.config();
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
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    if (!username) {
      throw new Error('USERNAME is not defined in Cypress environment variables');
    }
    if (!password) {
      throw new Error('PASSWORD is not defined in Cypress environment variables');
    }
    this.usernameInput().click().type(username);
    this.passwordInput().click().type(password);
    this.submitForm().click();
  }
}
