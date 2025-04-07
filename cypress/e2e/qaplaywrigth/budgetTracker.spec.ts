import { BudgetTrackerPage } from "../../support/pages/budgetTrackerPage";

describe('Testing budget-tracker application', () => {
  let budgetTrackerPage: BudgetTrackerPage;

  beforeEach(() => {
    budgetTrackerPage = new BudgetTrackerPage();
    cy.visit(budgetTrackerPage.url);
  });

  it('TC1: Should correctly add a new income and update the total amount', () => {
    cy.generateRandomAmount().then((randomAmount) => {
      budgetTrackerPage.addRandomNewEntry(randomAmount)
      budgetTrackerPage.getTotal().then(($el) => {
        const expectedFormatted = budgetTrackerPage.formatAmount(randomAmount);
        expect($el.text()).to.equal(expectedFormatted);
      });
    });
  });
  it('TC2: Should add a new expense entry and verify its type and values', () => {
    cy.generateRandomAmount().then((randomAmount)=>{
      budgetTrackerPage.addRandomNewEntry(randomAmount,"expense")
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
      return cy.generateRandomAmount().then((randomAmount) => {
        calculatedTotal -= randomAmount;
        budgetTrackerPage.addRandomNewEntry(randomAmount,"expense",index)
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
    const entries = budgetTrackerPage.entries
    entries.forEach((entry, index) => {
      cy.generateRandomAmount().then((randomAmount) => {
        budgetTrackerPage.addRandomNewEntry(randomAmount,entry.type, index, entry.description)
        calculatedTotal += budgetTrackerPage.updateTotal(entry.type, randomAmount);
      });
    });
    // Verificar total
    budgetTrackerPage.getTotal().then(($el) => {
      const expected = budgetTrackerPage.formatAmount(calculatedTotal);
      expect($el.text()).to.equal(expected);
    });
  });

  

});