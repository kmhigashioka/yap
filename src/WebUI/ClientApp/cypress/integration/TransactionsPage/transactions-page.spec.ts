describe('Transactions', () => {
  beforeEach(() => {
    cy.server();
    cy.login();
    cy.route('/api/users/accounts', 'fixture:accounts.json');
    cy.route(
      '/api/users/transactions?accountId=*',
      'fixture:transactions.json',
    );
    cy.route('/api/TransactionCategories', 'fixture:usercategories.json');
    cy.visit('/transactions');
  });

  it('should add an expense', () => {
    const transaction = {
      description: 'Load',
      date: '11/22/2019',
      category: {
        name: 'Charges',
      },
      amount: 200,
      type: 0,
    };
    cy.route('post', '/api/users/transactions?accountId=*', [transaction]);
    cy.findByText('There are no transactions.').should('be.exist');
    cy.findByTestId('add-transaction').click();
    cy.findByTestId('select-category').click();
    cy.findAllByRole('option').contains(transaction.category.name).click();
    cy.findByPlaceholderText('Amount')
      .clear()
      .type(transaction.amount.toString());
    cy.findByPlaceholderText('Description').type(transaction.description);
    cy.findByPlaceholderText('Date').type(transaction.date);
    cy.findByTestId('select-account').click();
    cy.findByText('Bank Developer Option').click();
    cy.findByText('Save').click();
    cy.findByText('Transaction successfully created.').should('be.visible');
  });

  it('should add an income', () => {
    const transaction = {
      description: 'Salary',
      date: '11/22/2019',
      category: {
        name: 'Charges',
      },
      amount: 20000,
      type: 1,
    };
    cy.route('post', '/api/users/transactions?accountId=*', [transaction]);
    cy.findByTestId('add-transaction').click();
    cy.findByTestId('select-type').click();
    cy.findByText('Income').click();
    cy.findByTestId('select-category').click();
    cy.findAllByRole('option').contains('Wage').click();
    cy.findByPlaceholderText('Amount')
      .clear()
      .type(transaction.amount.toString());
    cy.findByPlaceholderText('Description').type(transaction.description);
    cy.findByPlaceholderText('Date').type(transaction.date);
    cy.findByTestId('select-account').click();
    cy.findByText('Bank Developer Option').click();
    cy.findByText('Save').click();
    cy.findByText('Transaction successfully created.').should('be.visible');
  });

  it('should view first transaction', () => {
    cy.findByTestId('transaction-row-id-1').click();
    cy.get('form').then((subject) => {
      cy.findByText('Expense', { container: subject }).should('be.visible');
      cy.findByPlaceholderText('Amount', { container: subject }).should(
        'have.value',
        '200',
      );
      cy.findByPlaceholderText('Description', { container: subject }).should(
        'have.value',
        '',
      );
      cy.findByPlaceholderText('Date', { container: subject }).should(
        'have.value',
        '11/02/2019',
      );
    });
  });

  it('should delete first transaction', () => {
    cy.route('delete', '/api/users/transactions/1', {});
    cy.findByTestId('transaction-row-id-1').click();
    cy.findByTestId('delete-transaction').click();
    cy.findByText('Yes').click();
    cy.findByText('Transaction successfully deleted.').should('be.visible');
    cy.findByTestId('transaction-row-id-1').should('not.exist');
  });

  it('should dismiss delete dialog when No/Cancel is pressed', () => {
    cy.route('delete', '/api/users/transactions/1', {});
    cy.findByTestId('transaction-row-id-1').click();
    cy.findByTestId('delete-transaction').click();
    cy.findByText('No').click();
    cy.findByText('Are you sure you want to delete this transaction?').should(
      'not.exist',
    );
  });

  it('should edit first transaction', () => {
    cy.route('put', '/api/users/transactions', [
      { account: { id: 1, balance: -5000 } },
    ]);
    const newTransaction = {
      type: 'Income',
      amount: '5000',
      description: 'New HD',
      date: '11/23/2019',
      category: 'Charges',
    };
    cy.findByTestId('transaction-row-id-1').click();
    cy.findByTestId('select-transaction-type').click();
    cy.findByText('Income').click();
    cy.findByPlaceholderText('Amount').clear().type(newTransaction.amount);
    cy.findByPlaceholderText('Description').type(newTransaction.description);
    cy.findByPlaceholderText('Date').clear().type(newTransaction.date);
    cy.findByText('Save').click();
    cy.findByText('Transaction successfully updated.').should('be.visible');
    cy.get('[data-testid="transaction-row-id-1"]').then((subject) => {
      cy.findByText(newTransaction.type, { container: subject }).should(
        'be.visible',
      );
      cy.findByText(newTransaction.category, { container: subject }).should(
        'be.visible',
      );
      cy.findByText(newTransaction.amount, { container: subject }).should(
        'be.visible',
      );
      cy.findByText(newTransaction.description, { container: subject }).should(
        'be.visible',
      );
      cy.findByText(newTransaction.date, { container: subject }).should(
        'be.visible',
      );
    });
  });

  it('should toast warning message when there is no category', () => {
    const transaction = {
      description: 'Load',
      date: '11/22/2019',
      category: {
        name: 'Charges',
      },
      amount: 200,
      type: 0,
    };
    cy.route('post', '/api/users/transactions?accountId=*', [transaction]);
    cy.findByTestId('add-transaction').click();
    cy.findByText('Save').click();
    cy.findByText('Please select a category.').should('be.visible');
  });

  it('should toast warning message when there is no account', () => {
    const transaction = {
      description: 'Load',
      date: '11/22/2019',
      category: {
        name: 'Charges',
      },
      amount: 200,
      type: 0,
    };
    cy.route('post', '/api/users/transactions?accountId=*', [transaction]);
    cy.findByTestId('add-transaction').click();
    cy.findByTestId('select-category').click();
    cy.findAllByRole('option').contains(transaction.category.name).click();
    cy.findByText('Save').click();
    cy.findByText('Please select an account.').should('be.visible');
  });

  it('should able to handle error provided by API when creating Transaction', () => {
    const transaction = {
      description: 'Load',
      date: '11/22/2019',
      category: {
        name: 'Charges',
      },
      amount: 200,
      type: 0,
    };
    cy.route({
      method: 'POST',
      url: '/api/users/transactions?accountId=*',
      status: 400,
      response: { message: 'Error message from API' },
    });
    cy.findByTestId('add-transaction').click();
    cy.findByTestId('select-category').click();
    cy.findAllByRole('option').contains(transaction.category.name).click();
    cy.findByPlaceholderText('Amount')
      .clear()
      .type(transaction.amount.toString());
    cy.findByPlaceholderText('Description').type(transaction.description);
    cy.findByPlaceholderText('Date').type(transaction.date);
    cy.findByTestId('select-account').click();
    cy.findByText('Bank Developer Option').click();
    cy.findByText('Save').click();
    cy.findByText('Error message from API').should('be.visible');
  });

  it('should reset form when Add transaction is closed', () => {
    const transaction = {
      description: 'Load',
      date: '11/22/2019',
      category: {
        name: 'Charges',
      },
      amount: 200,
      type: 0,
    };
    cy.route({
      method: 'POST',
      url: '/api/users/transactions?accountId=*',
      status: 400,
      response: { message: 'Error message from API' },
    });
    cy.findByTestId('add-transaction').click();
    cy.findByTestId('select-category').click();
    cy.findAllByRole('option').contains(transaction.category.name).click();
    cy.findByPlaceholderText('Amount')
      .clear()
      .type(transaction.amount.toString());
    cy.findByPlaceholderText('Description').type(transaction.description);
    cy.findByPlaceholderText('Date').type(transaction.date);
    cy.findByTestId('select-account').click();
    cy.findByText('Bank Developer Option').click();
    cy.findByText('Cancel').click();
  });

  it('should reset form when Edit transaction is cancelled', () => {
    const newTransaction = {
      type: 'Expense',
      amount: '5000',
      description: 'New HD',
      date: '11/23/2019',
      category: 'Charges',
    };
    cy.findByTestId('transaction-row-id-1').click();
    cy.findByPlaceholderText('Amount').clear().type(newTransaction.amount);
    cy.findByPlaceholderText('Description').type(newTransaction.description);
    cy.findByPlaceholderText('Date').clear().type(newTransaction.date);
    cy.findByTestId('cancel-edit-transaction').click();
    cy.findByTestId('transaction-row-id-1').click();

    const oldTransaction = {
      amount: 200,
      id: 1,
      category: {
        name: 'Charges',
      },
      description: '',
      date: '11/02/2019',
      accountId: 1,
      type: 0,
    };
    cy.findByPlaceholderText('Amount').should(
      'have.value',
      oldTransaction.amount,
    );
    cy.findByPlaceholderText('Description').should(
      'have.value',
      oldTransaction.description,
    );
    cy.findByPlaceholderText('Date').should('have.value', oldTransaction.date);
  });

  it('should able to handle error provided by API when deleting Transaction', () => {
    cy.route({
      method: 'DELETE',
      url: '/api/users/transactions/1',
      status: 400,
      response: { message: 'Error message from API' },
    });
    cy.findByTestId('transaction-row-id-1').click();
    cy.findByTestId('delete-transaction').click();
    cy.findByText('Yes').click();
    cy.findByText('Error message from API').should('be.visible');
  });

  it('should able to handle error provided by API when editing Transaction', () => {
    cy.route({
      method: 'PUT',
      url: '/api/users/transactions',
      status: 400,
      response: { message: 'Error message from API' },
    });
    cy.findByTestId('transaction-row-id-1').click();
    cy.findByText('Save').click();
    cy.findByText('Error message from API').should('be.visible');
  });
});
