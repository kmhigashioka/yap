import { runOnSizes } from '../../common';

describe('Category Page', () => {
  runOnSizes(() => {
    beforeEach(() => {
      cy.server();
      cy.route('/api/TransactionCategories', 'fixture:usercategories.json');
      cy.login();
      cy.visit('/category');
    });

    it('should filter Category by W', () => {
      cy.findByPlaceholderText('Search for anything').type('W');
      cy.findAllByTestId(/category-row-name/).should('have.length', 2);
    });
  });
});
