describe('Testing Redirect Chain', () => {
    beforeEach('Visit URL', () => {
      cy.visit('https://qaplayground.dev/apps/redirect/');
    });
    it('TC01: Should verify each redirection using intercepts', () => {
        const redirects = [
          'second',
          'third',
          'fourth',
          'fifth',
          'sixth',
          'last'
        ];
    
        const interceptedUrls: string[] = [];
    
        // Intercept all matching requests
        cy.intercept('GET', '**/apps/redirect/**', (req) => {
          interceptedUrls.push(req.url);
        }).as('redirectChain');
    
        cy.visit('https://qaplayground.dev/apps/redirect/');
        cy.contains('Start Redirection chain').should('be.visible');
        cy.get('#redirect').click();
    
        // Final destination validation
        cy.url({ timeout: 10000 }).should('include', 'last');
        cy.get('#info').should('have.text', 'Welcome to the Last Page');
    
        // Validate all expected redirects occurred
        cy.then(() => {
          redirects.forEach((step) => {
            const matched = interceptedUrls.some(url => url.includes(step));
            expect(matched, `Redirect to ${step} should happen`).to.be.true;
          });
        });
      });

      
  });