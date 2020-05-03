/// <reference types="cypress" />

describe('InfiniteScroll', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });

  it('should load more products when scrolling down', () => {
    cy.get('.product-list-item').should('have.length', 10);
    cy.get('.product-list-item').last().scrollIntoView();
    cy.get('.product-list-item').should('have.length', 20, { timeout: 3000 });
  });
});
