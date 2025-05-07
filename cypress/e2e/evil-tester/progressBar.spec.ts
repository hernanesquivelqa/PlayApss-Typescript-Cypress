describe('Testing Progress Bar',()=>{
    beforeEach(() => {
        cy.visit('https://testpages.eviltester.com/styled/progress-bars-sync.html');
    });

    it('TC1: Progress Bar', () => {
        cy.get('#status').should('have.text', 'Running');
        cy.get('#progressbar0').should('have.value', 100);
        cy.get('#progressbar1').should('have.value', 100);
        cy.get('#progressbar2',{timeout:20000}).should('have.value', 100);
        cy.get('#status').should('have.text', 'Stopped');
    });
})