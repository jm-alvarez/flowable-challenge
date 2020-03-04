/// <reference types="cypress" />

describe('Checkout', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });

  it('should add the product to the cart and do the checkout', () => {
    cy.contains('Cart is empty', { timeout: 3000 });
    cy.contains('add_shopping_cart').click();
    cy.get('.cart-list-item');
    cy.contains('Checkout').click();
    cy.contains('Checkout was successfully completed!', { timeout: 3000 });
    cy.contains('Cart is empty', { timeout: 3000 });
  });
});
