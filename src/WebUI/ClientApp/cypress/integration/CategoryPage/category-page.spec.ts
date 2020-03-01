describe('Category Page', () => {
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
    cy.route('/api/usercategories?userId=1', 'fixture:usercategories.json');
    cy.login();
    cy.visit('/category', {
      onBeforeLoad(win) {
        const winCopy = win;
        delete winCopy.fetch;
        winCopy.eval(polyfill);
        winCopy.fetch = win.unfetch;
      },
    });
  });

  it("should set the Charges' display to off", () => {
    cy.route('PATCH', '/api/usercategories/1', {});
    cy.findByLabelText('Charges').click();
  });

  it('should filter Category by W', () => {
    cy.findByPlaceholderText('Search for anything').type('W');
    cy.findAllByTestId(/category-row-name/).should('have.length', 2);
  });
});
