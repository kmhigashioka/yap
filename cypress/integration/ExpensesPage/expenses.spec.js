describe('Expenses', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add an expense', () => {
    cy.findByTestId('add-transaction').click();
    cy.findByPlaceholderText('Category').type('Charges');
    cy.findByPlaceholderText('Amount')
      .clear()
      .type('200');
    cy.findByPlaceholderText('Description').type('Load');
    cy.findByPlaceholderText('Date').type('11/22/2019');
    cy.findByTestId('select-account').click();
    cy.findByText('Bank Developer Option').click();
    cy.findByText('Save').click();
    cy.findByText('Transaction successfully created.').should('be.visible');
  });

  it('should add an income', () => {
    cy.findByTestId('add-transaction').click();
    cy.findByTestId('select-type').click();
    cy.findByText('Income').click();
    cy.findByPlaceholderText('Category').type('Wage');
    cy.findByPlaceholderText('Amount')
      .clear()
      .type('20000');
    cy.findByPlaceholderText('Description').type('Salary');
    cy.findByPlaceholderText('Date').type('11/22/2019');
    cy.findByTestId('select-account').click();
    cy.findByText('Bank Developer Option').click();
    cy.findByText('Save').click();
    cy.findByText('Transaction successfully created.').should('be.visible');
  });

  it('should view first transaction', () => {
    cy.findByTestId('transaction-row-id-1').click();
    cy.get('form').then(subject => {
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
    cy.findByTestId('transaction-row-id-1').click();
    cy.findByTestId('delete-transaction').click();
    cy.findByText('Yes').click();
    cy.queryByTestId('transaction-row-id-1').should('not.be.visible');
    cy.findByText('Transaction successfully deleted.').should('be.visible');
  });

  it('should edit first transaction', () => {
    const newTransaction = {
      type: 'Expense',
      amount: '5000',
      description: 'New HD',
      date: '11/23/2019',
      category: 'Charges',
    };
    cy.findByTestId('transaction-row-id-1').click();
    cy.findByTestId('edit-transaction').click();
    cy.findByPlaceholderText('Amount')
      .clear()
      .type(newTransaction.amount);
    cy.findByPlaceholderText('Description').type(newTransaction.description);
    cy.findByPlaceholderText('Date')
      .clear()
      .type(newTransaction.date);
    cy.findByText('Save').click();
    cy.findByText('Transaction successfully updated.').should('be.visible');
    cy.get('[data-testid="transaction-row-id-1"]').then(subject => {
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
});