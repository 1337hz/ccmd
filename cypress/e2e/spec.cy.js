describe('Store tests', () => {
  it('using parent commands.', () => {
    cy.visit("")
    cy.login();
    cy.addItemToCart();
    cy.goToCheckout();

    cy.setFirstName("FirstName");
    cy.setLastName("LastName");
    cy.setPostalCode('123213');
    cy.submitCheckoutForm();
    cy.finishCheckout();

    cy.url().should("contain", "checkout-complete")
  })
})
