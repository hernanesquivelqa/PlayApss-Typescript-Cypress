export interface Entry {
    type: 'income' | 'expense';
    description: string;
  }
  
  export interface IBudgetTrackerPage {
    url: string;
    entries: Entry[];
  
    newEntryButton: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputDescription: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputAmount: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputDate: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputType: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
  
    clickOnNewEntryButton(): void;
    setDate(): Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    enterDescription(description: string, index?: number): void;
    enterAmount(amount: number, index?: number): void;
  
    getTotal(): Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    getFormattedTotal(): Cypress.Chainable<string>;
    formatAmount(amount: number): string;
  
    getRandomDescription(): string;
  
    addRandomNewEntry(
      randomAmount: number,
      type?: string,
      index?: number,
      randomDescription?: string
    ): void;
  
    updateTotal(type: string, amount: number): number;
  }