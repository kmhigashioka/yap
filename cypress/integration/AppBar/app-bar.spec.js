describe('AppBar', () => {
  let polyfill;

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
    cy.request(polyfillUrl).then(response => {
      polyfill = response.body;
    });
  });

  beforeEach(() => {
    cy.server();
    cy.route('/api/accounts', 'fixture:accounts.json');
    cy.visit('/', {
      onBeforeLoad(win) {
        const winCopy = win;
        delete winCopy.fetch;
        winCopy.eval(polyfill);
        winCopy.fetch = win.unfetch;
      },
    });
    cy.findByText('ALL').click();
  });

  it("should able to select BPI account and display BPI's transaction", () => {
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
