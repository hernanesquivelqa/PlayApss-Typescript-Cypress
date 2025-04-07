import { BudgetTrackerPage } from "../../support/pages/budgetTrackerPage";

describe('Testing budget-tracker application', () => {
  let budgetTrackerPage: BudgetTrackerPage;

  beforeEach(() => {
    budgetTrackerPage = new BudgetTrackerPage();
    cy.visit(budgetTrackerPage.url);
  });

  it('TC1: Should correctly add a new income and update the total amount', () => {
    cy.generateRandomAmount().then((randomAmount) => {
      budgetTrackerPage.clickOnNewEntryButton();
      budgetTrackerPage.setRandomDate()
      cy.get('.input.input-type').should('have.value','income')
      budgetTrackerPage.inputDate().should('have.value', budgetTrackerPage.setRandomDate())
      budgetTrackerPage.enterDescription("This is a description");
      budgetTrackerPage.enterAmount(randomAmount);
      
      budgetTrackerPage.getTotal().then(($el) => {
        const expectedFormatted = budgetTrackerPage.formatAmount(randomAmount);
        expect($el.text()).to.equal(expectedFormatted);
      });
    });
  });
  it('TC2: Should add a new expense entry and verify its type and values', () => {
    budgetTrackerPage.clickOnNewEntryButton();
    cy.generateRandomAmount().then((randomAmount)=>{
      budgetTrackerPage.setRandomDate()
      budgetTrackerPage.inputDate().should('have.value', budgetTrackerPage.setRandomDate())
      cy.get('.input.input-type')
      .select('expense')
      .should('have.value','expense')
      budgetTrackerPage.enterDescription("This is a description");
      budgetTrackerPage.enterAmount(randomAmount);
      let negativeAmount = -Math.abs(randomAmount);
      budgetTrackerPage.getTotal().then(($el) => {
        const expectedFormatted = budgetTrackerPage.formatAmount(negativeAmount);
        expect($el.text()).to.equal(expectedFormatted);
      });
      
    })
  });
  it('TC3: Adds multiple new expense entries and checks total', () => {
    let calculatedTotal = 0;
  
    const addEntry = (index: number = 0): Cypress.Chainable => {
      if (index >= 4) return cy.wrap(null); // Finaliza la recursión
  
      budgetTrackerPage.clickOnNewEntryButton();
  
      return cy.generateRandomAmount().then((randomAmount) => {
        const randomDate = budgetTrackerPage.setRandomDate(index);
        calculatedTotal -= randomAmount;
  
        budgetTrackerPage.inputDate().eq(index).should('have.value', randomDate);
  
        cy.get('.input.input-type')
          .eq(index)
          .select('expense')
          .should('have.value', 'expense');
  
        budgetTrackerPage.enterDescription("This is a description", index);
        budgetTrackerPage.enterAmount(randomAmount, index);
  
        return addEntry(index + 1); // Llamada recursiva
      });
    };
  
    // Iniciar el proceso y luego verificar el total
    addEntry(0).then(() => {
      budgetTrackerPage.getTotal().then(($el) => {
        const expected = budgetTrackerPage.formatAmount(calculatedTotal);
        expect($el.text()).to.equal(expected);
      });
    });
  });
  it('TC4: Adds multiple entries and checks total', () => {
    let calculatedTotal = 0;
  
    const entries = [
      { type: 'income', description: 'Salary' },
      { type: 'expense', description: 'Groceries' },
      { type: 'income', description: 'Bonus' },
      { type: 'expense', description: 'Rent' }
    ];
  
    entries.forEach((entry, index) => {
      budgetTrackerPage.clickOnNewEntryButton();
  
      cy.generateRandomAmount().then((randomAmount) => {
        // Tipo de entrada
        cy.get('.input.input-type').eq(index).select(entry.type);
  
        // Acumular total según el tipo
        if (entry.type === 'income') {
          calculatedTotal += randomAmount;
        } else {
          calculatedTotal -= randomAmount;
        }
  
        budgetTrackerPage.setRandomDate(index);
        budgetTrackerPage.enterDescription(entry.description, index);
        budgetTrackerPage.enterAmount(randomAmount, index);
      });
    });
    cy.wait(1000); 
    cy.reload()
    // Verificar total
    budgetTrackerPage.getTotal().then(($el) => {
      const expected = budgetTrackerPage.formatAmount(calculatedTotal);
      expect($el.text()).to.equal(expected);
    });
  });

  

});