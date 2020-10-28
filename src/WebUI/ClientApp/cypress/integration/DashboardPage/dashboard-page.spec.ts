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

  it('should able to handle delete account error API', () => {
    cy.route({
      method: 'DELETE',
      url: '/api/Users/Accounts?accountId=*',
      status: 400,
      response: {
        message: 'Error message from API',
      },
      delay: 1500,
    });
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Delete').click();
    cy.findByText('Proceed').click();
    cy.findByText('Account deletion in progress.').should('be.visible');
    cy.findByText('Error message from API').should('be.visible');
  });

  it('should dismiss delete account dialog', () => {
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Delete').click();
    cy.findByText('Cancel').click();
    cy.findByTestId(testid).should('be.visible');
  });

  it('should dismiss More Actions menu', () => {
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Delete').type('{esc}');
    cy.findByText('Delete').should('not.be.visible');
  });

  it('should edit account successfully', () => {
    const newAccount = {
      name: 'Bank Developer Optionx',
      abbreviation: 'BDX',
      balance: 2000,
    };
    cy.route('put', '/api/users/accounts', { id: 1, ...newAccount });
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Edit').click();
    cy.findByPlaceholderText('Name').clear().type(newAccount.name);
    cy.findByPlaceholderText(/Abbreviation/)
      .clear()
      .type(newAccount.abbreviation);
    cy.findByPlaceholderText('Starting Balance')
      .clear()
      .type(newAccount.balance.toString());
    cy.findByText('Save').click();
    cy.findByText('Account successfully updated.').should('be.visible');
  });

  it('should able to handle edit account error API', () => {
    cy.route({
      method: 'PUT',
      url: '/api/users/accounts',
      status: 400,
      response: {
        message: 'Error message from API',
      },
    });
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Edit').click();
    cy.findByText('Save').click();
    cy.findByText('Error message from API').should('be.visible');
  });

  it('should dismiss edit account dialog', () => {
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Edit').click();
    cy.findByText('Cancel').click();
    cy.findByText('Edit Account Information').should('not.be.visible');
  });
});
