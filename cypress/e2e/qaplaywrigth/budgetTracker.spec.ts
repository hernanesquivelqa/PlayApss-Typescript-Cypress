import { BudgetTrackerPage } from "../../support/pages/budgetTrackerPage";

describe('Testing budget-tracker application', () => {
  let budgetTrackerPage: BudgetTrackerPage;

  beforeEach(() => {
    budgetTrackerPage = new BudgetTrackerPage();
    cy.visit(budgetTrackerPage.url);
  });

  it('TC1: Adds a random amount and checks the total', () => {
    cy.generateRandomAmount().then((randomAmount) => {
      budgetTrackerPage.clickOnNewEntryButton();
      budgetTrackerPage.enterDescription("This is a description");
      budgetTrackerPage.enterAmount(randomAmount);
      
      budgetTrackerPage.getTotal().then(($el) => {
        const expectedFormatted = budgetTrackerPage.formatAmount(randomAmount);
        expect($el.text()).to.equal(expectedFormatted);
      });
    });
  });


});