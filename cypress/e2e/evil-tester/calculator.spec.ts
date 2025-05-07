import { CalculatorPage } from "../../support/pages/evilTester/calculatorPage";

describe('Testing Calculator App', () => {
  let calculatorPage: CalculatorPage;

  beforeEach(() => {
    calculatorPage = new CalculatorPage();
    calculatorPage.visit();
  });

  it.skip('should add two random numbers and verify the result', () => {
    const { num1, num2, expected } = calculatorPage.getTwoRandomNumbers();

    cy.log(`Random numbers: ${num1} + ${num2} = ${expected}`);
    calculatorPage.buttonAllClear();
    calculatorPage.enterNumber(num1);
    calculatorPage.clickPlus();
    calculatorPage.enterNumber(num2);
    calculatorPage.clickEquals();
    calculatorPage.getDisplay().should('have.value', expected);
  });
});

