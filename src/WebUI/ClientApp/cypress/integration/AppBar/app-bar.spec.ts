describe('AppBar', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/users/accounts', 'fixture:accounts.json');
    cy.route(
      '/api/users/transactions?accountId=*',
      'fixture:transactions.json',
    );
    cy.login();
    cy.visit('/');
  });

  it("should able to select BPI account and display BPI's transaction", () => {
    cy.visit('/transactions');
    cy.findByTitle('Select Account').click();
    cy.route('/api/transactions?accountId=2', [
      {
        amount: 1500,
        id: 3,
        category: 'Withdrawal',
        description: '',
        date: '11/2/2019',
        accountId: 2,
        type: 0,
      },
    ]);
    cy.findByText('Bank of the Personal Information').click();
    cy.findByTestId(/transaction-row-id/).should('have.length', 1);
  });

  it('should able to create new account', () => {
    const newAccount = {
      id: 1,
      name: 'New Account',
      abbreviation: 'NU',
      balance: 2501.49,
    };
    cy.route('POST', '/api/Accounts', newAccount);
    cy.findByTitle('Select Account').click();
    cy.findByText('CREATE NEW ACCOUNT').click();
    cy.findByPlaceholderText('Savings').type(newAccount.name);
    cy.findByPlaceholderText('XYZ').type(newAccount.abbreviation);
    cy.findByPlaceholderText('0').clear().type(newAccount.balance.toString());
    cy.findByText('Create').click();
    cy.findByText('New Account').should('be.visible');
    cy.findByText('New account successfully created.').should('be.exist');
  });

  it('should navigate to Dashboard page', () => {
    cy.findByTestId('navigation-menu-button').click();
    cy.findByText('Dashboard').click();
    cy.title().should('contain', 'Dashboard');
  });

  it('should navigate to Transactions page', () => {
    cy.findByTestId('navigation-menu-button').click();
    cy.findByText('Transactions').click();
    cy.title().should('contain', 'Transactions');
  });

  it('should navigate to Category page', () => {
    cy.route('/api/usercategories?userId=1', 'fixture:usercategories.json');
    cy.findByTestId('navigation-menu-button').click();
    cy.findByText('Category').click();
    cy.title().should('contain', 'Category');
  });

  it('should able to sign out', () => {
    cy.findByTitle('User Profile').click();
    cy.findByText('Sign Out').click();
    cy.findByText('LOGIN TO YOUR ACCOUNT').should('be.exist');
  });

  it('should able to convert guest user to end user', () => {
    cy.intercept('GET', '/api/users/me', {
      statusCode: 200,
      body: {
        fullName: 'John Doe',
        isGuest: true,
      },
    });
    const newValues = {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'password',
      username: 'janedoe',
    };
    cy.intercept('PUT', '/api/guests', { body: {} });
    cy.findByTitle('User Profile').click();
    cy.findByText(/register user/i).click();
    cy.findByPlaceholderText('John Doe').type(newValues.name);
    cy.findByPlaceholderText('johndoe@example.com').type(newValues.email);
    cy.findByPlaceholderText('johndoe').type(newValues.username);
    cy.findByPlaceholderText('Password').type(newValues.password);
    cy.findByPlaceholderText(/confirm password/i).type(newValues.password);
    cy.findByRole('button', { name: /register/i }).click();
    cy.findByText(newValues.name).should('be.visible');
    cy.findByText(newValues.email).should('be.visible');
    cy.findByText(/register user/i).should('not.exist');
    cy.findByText(newValues.name).type('{esc}');
    cy.findByRole('heading', { name: /welcome back, jane doe!/i }).should(
      'be.visible',
    );
  });

  it('should validate convert guest user to end user form', () => {
    cy.intercept('GET', '/api/users/me', {
      statusCode: 200,
      body: {
        fullName: 'John Doe',
        isGuest: true,
      },
    });
    const newValues = {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'password',
      username: 'janedoe',
    };
    const errorMessage = 'Something went wrong.';
    cy.intercept('PUT', '/api/guests', {
      statusCode: 400,
      body: { message: errorMessage },
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
    cy.findByRole('button', { name: /cancel/i }).click();
  });
});
