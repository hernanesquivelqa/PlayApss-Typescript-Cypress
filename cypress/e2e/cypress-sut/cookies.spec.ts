describe('Testing Cookies', () => {
  beforeEach('Visit the page and clear all cookies', () => {
    Cypress.Cookies.debug(true);
    cy.visit('https://example.cypress.io/commands/cookies');
    cy.clearAllCookies();
  });
  it('TC1: Set cookie', () => {
    cy.get('#getCookie .set-a-cookie').click();
    cy.getCookie('token').then(cookie => {
      expect(cookie).to.have.property('value', '123ABC');
      expect(cookie).to.have.property('domain', 'example.cypress.io');
      expect(cookie).to.have.property('secure', false);
    });
  });
});
