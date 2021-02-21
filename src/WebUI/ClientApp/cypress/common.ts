const sizes = ['iphone-4', 'ipad-mini', 'macbook-13'];

const runOnSizes = (tests: () => void): void => {
  sizes.forEach((size) => {
    describe(`Running on [${size}]`, () => {
      beforeEach(() => {
        cy.viewport(size);
      });

      tests();
    });
  });
};

function login(visit: string, { overrides } = { overrides: {} }): void {
  cy.intercept('POST', '/connect/token', {
    access_token: 'SOME ACCESS TOKEN',
    refresh_token: 'SOME_REFRESH_TOKEN',
  });
  let apiUsersMeResponse = {};
  if (overrides['/api/users/me']) {
    apiUsersMeResponse = overrides['/api/users/me'];
  }
  cy.intercept('GET', '/api/users/me', apiUsersMeResponse);
  cy.intercept('GET', '/api/users/accounts', { fixture: 'accounts.json' });
  cy.visit(visit);
}

export { runOnSizes, login };
