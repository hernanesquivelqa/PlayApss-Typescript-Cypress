describe('HTTP Messages App', () => {
  const url = 'https://testpages.eviltester.com/styled/sync/xhttp-messages.html';

  it('should process all HTTP messages and end at count 0:0', () => {
    cy.visit(url);
    cy.get('#messagecount', { timeout: 15000 })
      .should('contain.text', '0 : 0');
  })
});