describe('Testing budget-tracker application', () => {
    beforeEach(() => {
      cy.visit('https://qaplayground.dev/apps/budget-tracker/');
    });
    it('TC1: Adds a random amount and checks the total',()=>{
      const randomAmount = Math.floor(Math.random() * 100000) + 1;  
      cy.get(".controls > button").click();
        cy.get('.input.input-description').type("This is a description");
        cy.get('.input.input-amount').clear().type(`${randomAmount}{enter}`);
        // Esperamos a que todo se procese antes de verificar
        cy.get('td.summary > span.total').then(($el) => {
          const expectedFormatted = randomAmount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
      
          expect($el.text()).to.equal(expectedFormatted);
        });
      });
    })
    it.skip('TC2: Adds multiple transactions and checks formatted total', () => {
      
  });