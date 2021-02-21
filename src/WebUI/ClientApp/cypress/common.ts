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

function login(visit = '/', { overrides } = { overrides: {} }): void {
  cy.intercept('POST', '/connect/token', {
    access_token: 'SOME ACCESS TOKEN',
    refresh_token: 'SOME_REFRESH_TOKEN',
  });
  [
    { url: '/api/users/me', defaultResponse: {} },
    {
      url: '/api/users/accounts',
      defaultResponse: { fixture: 'accounts.json' },
    },
  ].forEach(({ url, defaultResponse }) => {
    const response = overrides[url] ? overrides[url] : defaultResponse;
    cy.intercept('GET', url, response);
  });
  cy.visit(visit);
}

export { runOnSizes, login };
