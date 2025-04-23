export class RedirectChain {
    readonly url: string = "https://qaplayground.dev/apps/redirect/";
  
    // Selectores encapsulados
    private redirectBtnSelector: string = '#redirect';
    private infoTextSelector: string = '#info';
  

    readonly redirects: string[] = [
      'second', 'third', 'fourth', 'fifth', 'sixth', 'last'
    ];
  
    visitPage() {
      cy.visit(this.url);
    }
  
    clickRedirectButton() {
      cy.get(this.redirectBtnSelector).click();
    }
  
    validateFinalText(expected: string) {
      cy.get(this.infoTextSelector).should('have.text', expected);
    }
  
    verifyRedirects(interceptedUrls: string[]) {
      this.redirects.forEach(step => {
        const matched = interceptedUrls.some(url => url.includes(step));
        expect(matched, `Redirect to ${step} should happen`).to.be.true;
      });
    }
  }