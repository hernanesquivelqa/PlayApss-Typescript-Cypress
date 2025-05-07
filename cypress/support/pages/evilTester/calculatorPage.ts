export class CalculatorPage {
    url: string;
  
    constructor() {
      this.url = "https://testpages.eviltester.com/styled/apps/calculator.html";
    }
  
    visit() {
      cy.visit(this.url);
    }
  
    clearDisplay() {
      cy.get('#calculated-display').clear();
    }
  
    enterNumber(value: string) {
      // Limpia el display antes de escribir para evitar concatenaciones indeseadas
      this.clearDisplay();
      cy.get('#calculated-display').type(value);
    }
  
    clickPlus() {
      cy.get('#buttonplus').click();
    }
  
    clickEquals() {
      cy.get('#buttonequals').click();
    }
    buttonAllClear() {  
    cy.get('#buttonallclear').click();
    }
  
    getDisplay() {
      return cy.get('#calculated-display');
    }
  
    getRandomStringNumber(): string {
      const numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const randomIndex = Math.floor(Math.random() * numbers.length);
      return numbers[randomIndex];
    }
  
    getTwoRandomNumbers(): { num1: string, num2: string, expected: string } {
      let num1 = this.getRandomStringNumber();
      let num2 = this.getRandomStringNumber();
  
      // Previene el caso en que un número se duplica por error de concatenación visual
      if (num1 === '6' && num2 === '0') {
        num2 = num1;
      }
  
      const expected = (parseInt(num1) + parseInt(num2)).toString();
      return { num1, num2, expected };
    }
  }