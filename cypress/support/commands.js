Cypress.Commands.add('login', { prevSubject: 'optional' }, (subject) => {

  if (!subject) {
    cy.log("I need to visit website first.")
    cy.visit("");
  }

  cy.get('[data-test="username"]')
    .type('standard_user');
  cy.get('[data-test="password"]')
    .type('secret_sauce');
  cy.get('[data-test="login-button"]')
    .click();

  cy.url().should("contain", "inventory");
  cy.get('#inventory_container');

});

Cypress.Commands.add('addItemToCart', () => {
  cy.get('.inventory_item button').first().click();
});

Cypress.Commands.add('goToCheckout', () => {
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();
});


Cypress.Commands.add('getCheckoutForm', () => {
  return cy.get('.checkout_info')
});

Cypress.Commands.add('setFirstName', { prevSubject: 'element' }, (subject, val) => {
  expect(subject).to.have.class('checkout_info');

  return cy.wrap(subject).find('#first-name')
    .type(val)
    .should("have.value", val)
    .then(() => subject);
});

Cypress.Commands.add('setLastName', { prevSubject: 'element' }, (subject, val) => {
  expect(subject).to.have.class('checkout_info');

  return cy.wrap(subject).find('#last-name')
    .type(val)
    .should("have.value", val)
    .then(() => subject);
});

Cypress.Commands.add('setPostalCode', { prevSubject: 'element' }, (subject, val) => {
  expect(subject).to.have.class('checkout_info');

  return cy.wrap(subject).find('#postal-code')
    .type(val)
    .should("have.value", val)
    .then(() => subject)
});

Cypress.Commands.add('submitCheckoutForm', () => {
  cy.get('[data-test="continue"]').click();
});

Cypress.Commands.add('finishCheckout', () => {
  cy.get('[data-test="finish"]').click();
});
