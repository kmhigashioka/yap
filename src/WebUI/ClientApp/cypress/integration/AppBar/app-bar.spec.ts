import { login } from '../../common';

describe('AppBar', () => {
  it("should able to select BPI account and display BPI's transaction", () => {
    cy.intercept('GET', '/api/users/transactions?accountId=*', {
      fixture: 'transactions.json',
    });
    cy.intercept('GET', '/api/TransactionCategories', []);
    login('/transactions');
    cy.findByTitle('Select Account').click();
    cy.findByText('Bank of the Personal Information').click();
    cy.findByTestId(/transaction-row-id/).should('have.length', 1);
  });

  it('should able to create new account', () => {
    cy.intercept('GET', '/api/users/transactions?accountId=*', {
      fixture: 'transactions.json',
    });
    cy.intercept('GET', '/api/TransactionCategories', []);
    const newAccount = {
      id: 1,
      name: 'New Account',
      abbreviation: 'NU',
      balance: 2501.49,
    };
    cy.intercept('POST', '/api/Accounts', newAccount);
    login('/transactions');
    cy.findByTitle('Select Account').click();
    cy.findByText('CREATE NEW ACCOUNT').click();
    cy.findByPlaceholderText('Savings').type(newAccount.name);
    cy.findByPlaceholderText('XYZ').type(newAccount.abbreviation);
    cy.findByPlaceholderText('0').clear().type(newAccount.balance.toString());
    cy.findByText('Create').click();
    cy.findByText(/new account successfully created./i).should('be.visible');
    cy.findByRole('button', { name: 'A' }).click();
    cy.findByText(newAccount.name).should('be.visible');
  });

  it('should navigate to Dashboard page', () => {
    login();
    cy.findByTestId('navigation-menu-button').click();
    cy.findByText('Dashboard').click();
    cy.title().should('contain', 'Dashboard');
  });

  it('should navigate to Transactions page', () => {
    cy.intercept('GET', '/api/users/transactions?accountId=*', {
      fixture: 'transactions.json',
    });
    cy.intercept('GET', '/api/TransactionCategories', []);
    login();
    cy.findByTestId('navigation-menu-button').click();
    cy.findByText('Transactions').click();
    cy.title().should('contain', 'Transactions');
    cy.findAllByRole('row').should('have.length', 2);
  });

  it('should navigate to Category page', () => {
    cy.intercept('GET', '/api/TransactionCategories', {
      fixture: 'usercategories.json',
    });
    login();
    cy.findByTestId('navigation-menu-button').click();
    cy.findByText('Category').click();
    cy.title().should('contain', 'Category');
  });

  it('should able to sign out', () => {
    login();
    cy.findByTitle('User Profile').click();
    cy.findByText('Sign Out').click();
    cy.findByText('LOGIN TO YOUR ACCOUNT').should('be.exist');
  });

  it('should able to convert guest user to end user', () => {
    const newValues = {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'password',
      username: 'janedoe',
    };
    const errorMessage = 'Something went wrong.';
    let isFailed = true;
    cy.intercept('PUT', '/api/guests', (req) => {
      if (isFailed) {
        isFailed = false;
        req.reply({
          statusCode: 400,
          body: { message: errorMessage },
        });
        return;
      }
      req.reply({ statusCode: 200, body: {} });
    });
    login('/', {
      overrides: {
        '/api/users/me': {
          statusCode: 200,
          body: {
            fullName: 'John Doe',
            isGuest: true,
          },
        },
      },
    });
    cy.findByTitle('User Profile').click();
    cy.findByText(/register user/i).click();
    cy.findByPlaceholderText('John Doe').type(newValues.name);
    cy.findByPlaceholderText('johndoe@example.com').type(newValues.email);
    cy.findByPlaceholderText('johndoe').type(newValues.username);
    cy.findByPlaceholderText('Password').type(newValues.password);
    cy.findByPlaceholderText(/confirm password/i).type('abcde');
    cy.findByRole('button', { name: /register/i }).click();
    cy.findAllByText('Password and Confirm Password did not match.').should(
      'be.visible',
    );
    cy.findByPlaceholderText(/confirm password/i)
      .clear()
      .type(newValues.password);
    cy.findByRole('button', { name: /register/i }).click();
    cy.findByRole('button', { name: /register/i }).click();
    cy.findByText(newValues.name).should('be.visible');
    cy.findByText(newValues.email).should('be.visible');
    cy.findByText(/register user/i).should('not.exist');
    cy.findByText(newValues.name).type('{esc}');
    cy.findByRole('heading', { name: /welcome back, jane doe!/i }).should(
      'be.visible',
    );
  });
});
