describe('Store tests', () => {
  it('using dual commands.', () => {
    cy.login();
    cy.addItemToCart();
    cy.goToCheckout();

    cy.getCheckoutForm()
      .setFirstName("FirstName")
      .setLastName("LastName")
      .setPostalCode('123213');
    cy.submitCheckoutForm();

    cy.finishCheckout();

    cy.url().should("contain", "checkout-complete");
  })
})
