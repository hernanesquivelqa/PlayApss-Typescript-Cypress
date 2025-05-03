describe('Testing Calculator App',()=>{

it('should be able to add two numbers', () => {
    cy.visit('https://testpages.eviltester.com/styled/apps/calculator.html')
    cy.get('#calculated-display').type('2')
    cy.get('#buttonplus').click()
    cy.get('#calculated-display').type('2')
    cy.get('#buttonequals').click().then(() => {
        cy.get('#calculated-display').should('have.value', '4')
    })
})
})