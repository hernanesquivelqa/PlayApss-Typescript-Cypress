import InputValidation from "../../support/pages/evilTester/inputValidation";

describe('Input Validation EvilTester', () => {
  let inputValidation: InputValidation;

  beforeEach(() => {  
    inputValidation = new InputValidation();
  });

  it('TC1: Validate form succeed', () => {
    const username = inputValidation.randomUsername();
    const surname = 'Pagatzaurtunduagoienengoa';
    const ageValue = inputValidation.randomAge(); 
    const country = 'Argentina';
    const notes = 'This is a test note';

    cy.visit(inputValidation.url);
    cy.get('#firstname').type(username);
    cy.get('#surname').type(surname);
    cy.get('#age').type(ageValue);
    cy.get('#country').select(country);
    cy.get('#notes').type(notes);
    cy.get('[type="submit"]').click();
    
    cy.url().should('include', 'input-validation');
    cy.get('#firstname-value').should('have.text', username);
    cy.get('#surname-value').should('have.text', surname);
    cy.get('#age-value').should('have.text', ageValue);
    cy.get('#country-value').should('have.text', country);
    cy.get('#notes-value').should('have.text', notes);
  });
});
