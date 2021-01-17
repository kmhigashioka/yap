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
});
