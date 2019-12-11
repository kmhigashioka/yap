describe('Category Page', () => {
  beforeEach(() => {
    cy.visit('/category');
  });

  it("should set the Charges' display to off", () => {
    cy.findByLabelText('Charges').click();
  });

  it('should filter Category by W', () => {
    cy.findByPlaceholderText('Search for anything').type('W');
    cy.findAllByTestId(/category-row-name/).should('have.length', 2);
  });
});
