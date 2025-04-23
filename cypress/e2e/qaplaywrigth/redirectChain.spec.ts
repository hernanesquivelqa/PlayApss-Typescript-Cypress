import { RedirectChain } from "../../support/pages/redirectChainPage";

const redirectPage = new RedirectChain();

describe('Redirect Chain Test', () => {
  it('Should verify all redirects and final page content', () => {
    const interceptedUrls: string[] = [];

    cy.intercept('GET', '**/apps/redirect/**', (req) => {
      interceptedUrls.push(req.url);
    });

    redirectPage.visitPage();
    redirectPage.clickRedirectButton();

    cy.url().should('include', 'last');
    redirectPage.validateFinalText('Welcome to the Last Page');

    cy.then(() => {
      redirectPage.verifyRedirects(interceptedUrls);
    });
  });
});