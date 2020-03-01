describe('LoginPage', () => {
  let polyfill;

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
    cy.request(polyfillUrl).then(response => {
      polyfill = response.body;
    });
  });

  it('should successfully login', () => {
    cy.server();
    cy.route('POST', '/connect/token', {
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    });
    cy.visit('/login', {
      onBeforeLoad(win) {
        const winCopy = win;
        delete winCopy.fetch;
        winCopy.eval(polyfill);
        winCopy.fetch = win.unfetch;
      },
    });

    cy.findByPlaceholderText('Username').type('m2m');
    cy.findByPlaceholderText('Password').type('secret');
    cy.findByText('Login').click();

    cy.title().should('contain', 'Dashboard');
  });

  it('should display error message when using invalid credential', () => {
    cy.server();
    cy.route({
      url: '/connect/token',
      method: 'POST',
      status: 400,
      response: {},
    });
    cy.visit('/login', {
      onBeforeLoad(win) {
        const winCopy = win;
        delete winCopy.fetch;
        winCopy.eval(polyfill);
        winCopy.fetch = win.unfetch;
      },
    });

    cy.findByPlaceholderText('Username').type('invalid');
    cy.findByPlaceholderText('Password').type('credential');
    cy.findByText('Login').click();

    cy.findByText('Invalid username or password.').should('be.visible');
    cy.findByPlaceholderText('Username').click();
    cy.findByText('Invalid username or password.').should('not.be.visible');
  });
});
