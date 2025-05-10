describe('Testing Keys and Click Event Display',() =>{
beforeEach(() => {
cy.visit('https://testpages.eviltester.com/styled/key-click-display-test.html');

})
it('TC1: Click on the button and verify incremented event IDs', () => {
  let id = 1;

  const checkEvent = () => {
    cy.get('#button').click();
    cy.get(`#event${id}`).should('have.text', `click`);
    id++;
  };
  checkEvent(); // Verifica event1
  checkEvent(); // Verifica event2
  checkEvent(); // Verifica event3
});
})
