import { runOnSizes, login } from '../../common';

describe('Category Page', () => {
  runOnSizes(() => {
    it('should filter Category by W', () => {
      cy.intercept('GET', '/api/TransactionCategories', {
        fixture: 'usercategories.json',
      });
      login('/category');
      cy.findByPlaceholderText('Search for anything').type('W');
      cy.findAllByTestId(/category-row-name/).should('have.length', 2);
    });
  });
});
