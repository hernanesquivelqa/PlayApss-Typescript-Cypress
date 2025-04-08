import { IBudgetTrackerPage, Entry } from "../types/budgetTrackerPage.interface";

export class BudgetTrackerPage implements IBudgetTrackerPage {
  // Selectores
  private selectors = {
    newEntryButton: ".controls > button",
    inputDescription: ".input.input-description",
    inputAmount: ".input.input-amount",
    inputDate: "input.input-date",
    inputType: ".input.input-type",
  };

  // Lista de descripciones posibles
  private descriptions: string[] = [
    "Monthly Salary", "Grocery Shopping", "Freelance Payment", "Rent Payment",
    "Utility Bills", "Restaurant Dinner", "Online Subscription", "Car Maintenance",
    "Holiday Gift", "Investment Dividend"
  ];

  // Constructor
  constructor(
    public url: string = "https://qaplayground.dev/apps/budget-tracker/",
    public entries: Entry[] = [
      { type: 'income', description: 'Salary' },
      { type: 'expense', description: 'Groceries' },
      { type: 'income', description: 'Bonus' },
      { type: 'expense', description: 'Rent' }
    ]
  ) {}

  // ------------------------------
  // ✅ Métodos públicos (interfaz)
  // ------------------------------

  newEntryButton = () => this.getElement(this.selectors.newEntryButton);
  inputDescription = () => this.getElement(this.selectors.inputDescription);
  inputAmount = () => this.getElement(this.selectors.inputAmount);
  inputDate = () => this.getElement(this.selectors.inputDate);
  inputType = () => this.getElement(this.selectors.inputType);

  clickOnNewEntryButton(): void {
    this.newEntryButton().click();
  }

  setDate(): Cypress.Chainable<JQuery<HTMLHtmlElement>> {
    const localDate: string = this.localDate(); 
    this.inputDate()
      .should('have.attr', 'type', 'date')
      .type(localDate);
    return this.inputDate();
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

  getFormattedTotal(): Cypress.Chainable<string> {
    return this.getTotal().then(($el) => $el.text());
  }

  formatAmount(amount: number): string {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  getRandomDescription(): string {
    const randomIndex = Math.floor(Math.random() * this.descriptions.length);
    return this.descriptions[randomIndex];
  }

  addRandomNewEntry(
    randomAmount: number,
    type: string = "income",
    index: number = 0,
    randomDescription: string = this.getRandomDescription()
  ) {
    this.clickOnNewEntryButton();
    this.setRandomDate();
    this.inputType().eq(index).select(type).should('have.value', type);
    this.inputDate().eq(index).should('have.value', this.setRandomDate());
    this.enterDescription(randomDescription, index);
    this.enterAmount(randomAmount, index);
  }

  updateTotal(type: string, amount: number): number {
    return type === 'income' ? amount : -amount;
  }

  // ------------------------------
  // 🔒 Métodos privados (internos)
  // ------------------------------

  private getElement(selector: string): Cypress.Chainable<JQuery<HTMLHtmlElement>> {
    return cy.get(selector);
  }

  private localDate(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  private randomDate(start: Date, end: Date): string {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  }

  private setRandomDate(index: number = 0): string {
    const randomDate: string = this.randomDate(new Date(2020, 0, 1), new Date());
    this.inputDate()
      .eq(index)
      .should('have.attr', 'type', 'date')
      .type(randomDate);
    return randomDate;
  }
}
