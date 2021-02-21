import { login } from '../../common';

describe('Dashboard', () => {
  it('should delete account successfully', () => {
    cy.intercept('DELETE', '/api/Users/Accounts?accountId=*', { body: {} });
    login();
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Delete').click();
    cy.findByText('Proceed').click();
    cy.findByText('Account successfully deleted.').should('be.visible');
    cy.findByTestId(testid).should('not.exist');
  });

  it('should able to handle delete account error API', () => {
    cy.intercept('DELETE', '/api/Users/Accounts?accountId=*', {
      statusCode: 400,
      body: {
        message: 'Error message from API',
      },
    });
    login();
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Delete').click();
    cy.findByText('Proceed').click();
    cy.findByText('Error message from API').should('be.visible');
  });

  it('should dismiss delete account dialog, More Actions menu', () => {
    login();
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Delete').click();
    cy.findByText('Cancel').click();
    cy.findByTestId(testid).should('be.visible');

    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Delete').type('{esc}');
    cy.findByText('Delete').should('not.exist');
  });

  it('should edit account successfully', () => {
    const newAccount = {
      name: 'Bank Developer Optionx',
      abbreviation: 'BDX',
      balance: 2000,
    };
    cy.intercept('PUT', '/api/users/accounts', { id: 1, ...newAccount });
    login();
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Edit').click();
    cy.findByPlaceholderText('Savings').clear().type(newAccount.name);
    cy.findByPlaceholderText('XYZ').clear().type(newAccount.abbreviation);
    cy.findByPlaceholderText('0').clear().type(newAccount.balance.toString());
    cy.findByText('Save').click();
    cy.findByText('Account successfully updated.').should('be.visible');
  });

  it('should able to handle edit account error API', () => {
    cy.intercept('PUT', '/api/users/accounts', {
      statusCode: 400,
      body: {
        message: 'Error message from API',
      },
    });
    login();
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Edit').click();
    cy.findByText('Save').click();
    cy.findByText('Error message from API').should('be.visible');
    cy.findByText('Cancel').click();
    cy.findByText('Edit Account Information').should('not.exist');
  });

  it('should set to ALL when active account is deleted', () => {
    cy.intercept('DELETE', '/api/Users/Accounts?accountId=*', { body: {} });
    login();
    cy.findByTitle('Select Account').click();
    cy.findByText('BDO').click().type('{esc}');
    const testid = 'account-1';
    cy.findByTestId(testid).findByTitle('More Actions').click();
    cy.findByText('Delete').click();
    cy.findByText('Proceed').click();
    cy.findByTitle('Select Account').should('be.exist');
  });

  it('should open Create New Account button from empty placeholder', () => {
    login('/', { overrides: { '/api/users/accounts': [] } });
    cy.findByLabelText('CREATE ONE HERE').click();
    cy.findByText('CREATE NEW ACCOUNT').click();
    cy.findByRole('dialog').should('be.exist');
  });
});
