import { nth } from "cypress/types/lodash";
import { IBudgetTrackerPage } from "../types/budgetTrackerPage.interface";
export class BudgetTrackerPage implements IBudgetTrackerPage {
    url: string;
    newEntryButton: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputDescription: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputAmount: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputDate: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    constructor(){
        this.url = "https://qaplayground.dev/apps/budget-tracker/";
        this.newEntryButton = () => cy.get(".controls > button");
        this.inputDescription = () => cy.get('.input.input-description');
        this.inputAmount = () => cy.get('.input.input-amount');
        this.inputDate = () => cy.get('input.input-date');
    }

    clickOnNewEntryButton(): void {
        this.newEntryButton().click();
    }
    localDate(): string {
      const date = new Date();
      // Formato YYYY-MM-DD que entiende el input type="date"
      return date.toISOString().split('T')[0];
    }
    
    setDate(): Cypress.Chainable<JQuery<HTMLHtmlElement>> {
      const localDate: string = this.localDate(); 
      this.inputDate()
        .should('have.attr', 'type', 'date')
        .type(localDate);
    
      return this.inputDate();
    }
    randomDate(start: Date, end: Date): string {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split('T')[0]; // Formato compatible con input[type="date"]
    }
    setRandomDate(index:number = 0): string {
      const randomDate: string = this.randomDate(new Date(2020, 0, 1), new Date()); // entre 01/01/2020 y hoy
      this.inputDate()
        .eq(index)
        .should('have.attr', 'type', 'date')
        .type(randomDate);
    
      return randomDate;
    }



    enterDescription(description: string, index: number = 0): void {
        this.inputDescription().eq(index).type(description);
    }

    enterAmount(amount: number, index: number = 0): void {
        this.inputAmount().eq(index).clear().type(`${amount}{enter}`);
    }

    getTotal(): Cypress.Chainable<JQuery<HTMLHtmlElement>> {
        return cy.get('td.summary > span.total');
    }

      formatAmount(amount: number): string {
        return amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
    
      // Opcional: Método que combina obtener y formatear
      getFormattedTotal(): Cypress.Chainable<string> {
        return this.getTotal().then(($el) => {
          return $el.text(); // Devuelve el texto ya formateado por la UI
        });
      }
}