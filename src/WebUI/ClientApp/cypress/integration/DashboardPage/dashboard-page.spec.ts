describe('Dashboard', () => {
  beforeEach(() => {
    cy.server();
    cy.login();
    cy.route('/api/users/accounts', 'fixture:accounts.json');
    cy.visit('/');
  });

  it('should delete account successfully', () => {
    cy.server({ delay: 1500 });
    cy.route('delete', '/api/Users/Accounts?accountId=*', {});
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Delete').click();
    cy.findByText('Proceed').click();
    cy.findByText('Account deletion in progress.').should('be.visible');
    cy.findByText('Account successfully deleted.').should('be.visible');
    cy.findByTestId(testid).should('not.be.visible');
  });
});
