/// <reference types="cypress" />

describe('Checkout', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });

  it('should add the product to the cart and do the checkout', () => {
    cy.contains('Cart is empty', { timeout: 3000 });

    cy.get('.product-stock button').then((buttons) => {
      buttons[0].click();
      buttons[1].click();
      buttons[2].click();
    });
    cy.get('.cart-list-item').should('have.length', 3);
    cy.get('.total-price').contains('207$');
    doCheckout();

    cy.get('.product-stock button').then((buttons) => {
      buttons[0].click();
    });
    cy.get('.cart-list-item').should('have.length', 1);
    cy.get('.total-price').contains('43$');
    doCheckout();
  });
});

const doCheckout = () => {
  cy.contains('Checkout').click();
  cy.contains('Checkout was successfully completed!', { timeout: 3000 });
  cy.contains('Cart is empty', { timeout: 3000 });
};
