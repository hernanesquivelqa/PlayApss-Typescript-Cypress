describe('Testing Refresh', () => {
    beforeEach(() => {
      cy.visit('https://testpages.eviltester.com/styled/refresh');
    });
  
    it('TC1: Refresh debería aumentar el número en 2', () => {
      cy.get('#embeddedrefreshdatevalue')
        .invoke('text')
        .then((text: string) => {
          let inicial:number = parseInt(text.trim(), 10);
  
          cy.get('#button').click();
  
          cy.get('#embeddedrefreshdatevalue')
            .invoke('text')
            .then((newText: string) => {
              const nuevo:number = parseInt(newText.trim(), 10);
              expect(nuevo).to.equal(inicial + 1);
            });
        });
    });
  });