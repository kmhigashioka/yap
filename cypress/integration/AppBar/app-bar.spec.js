describe('AppBar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByText('ALL').click();
  });

  it("should able to select BPI account and display BPI's transaction", () => {
    cy.findByText('Bank of the Personal Information').click();
    cy.findByTestId(/transaction-row-id/).should('have.length', 1);
  });

  it('should able to create new account', () => {
    cy.findByText('CREATE NEW ACCOUNT').click();
    cy.findByPlaceholderText('Name').type('New Account');
    cy.findByPlaceholderText(/Abbreviation/).type('NU');
    cy.findByPlaceholderText('Starting Balance')
      .clear()
      .type('500');
    cy.findByText('Create').click();
    cy.findByText('ALL').click();
    cy.findByText('New Account').should('be.visible');
  });
});
