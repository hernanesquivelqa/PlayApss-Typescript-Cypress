export interface ILoginPage {
  url: string;
  boxForm: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
  usernameInput: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
  passwordInput: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
  submitForm: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
  fillForm(): void;
}
