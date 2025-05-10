describe('Testing Media Queries', () => {
    beforeEach(() => {
      // Simula un viewport grande (más de 1800px de ancho)
      cy.visit('https://testpages.eviltester.com/styled/css-media-queries.html');
    });
  
    it('TC1: Media Queries viewport 1900 to 1000', () => {
      cy.viewport(1900, 1000);
      cy.get('.csshidden.s1800').should('be.visible');
    });
    it('TC2: Media Queries viewport 1600 to 1000', () => {
        cy.viewport(1600, 1000);
        cy.get('.csshidden.s1600').should('be.visible');
      });

  });