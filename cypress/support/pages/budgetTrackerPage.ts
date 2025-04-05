import { IBudgetTrackerPage } from "../types/budgetTrackerPage.interface";
export class BudgetTrackerPage implements IBudgetTrackerPage {
    url: string;
    newEntryButton: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputDescription: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputAmount: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;

    constructor(){
        this.url = "https://qaplayground.dev/apps/budget-tracker/";
        this.newEntryButton = () => cy.get(".controls > button");
        this.inputDescription = () => cy.get('.input.input-description');
        this.inputAmount = () => cy.get('.input.input-amount');
    }

    clickOnNewEntryButton(): void {
        this.newEntryButton().click();
    }
    
    enterDescription(description: string): void {
        this.inputDescription().type(description);
    }

    enterAmount(amount: number): void {
        this.inputAmount().clear().type(`${amount}{enter}`);
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