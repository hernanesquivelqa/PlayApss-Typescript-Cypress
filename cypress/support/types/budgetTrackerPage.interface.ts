export interface IBudgetTrackerPage{
    url: string
    newEntryButton: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>
    inputDescription: ()=> Cypress.Chainable<JQuery<HTMLHtmlElement>>
    inputAmount: () => Cypress.Chainable<JQuery<HTMLHtmlElement>>;
}