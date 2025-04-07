export interface Entry {
    type: 'income' | 'expense';
    description: string;
}
export interface IBudgetTrackerPage{
    url: string
    newEntryButton: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>
    inputDescription: ()=> Cypress.Chainable<JQuery<HTMLHtmlElement>>
    inputAmount: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputDate: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    inputType: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
    entries: Entry[];
    getRandomDescription(): string; 
}