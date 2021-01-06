describe('LoginPage', () => {
  const sizes = ['iphone-4', 'ipad-mini', 'macbook-13'];

  sizes.forEach((size) => {
    describe(`viewport is [${size}]`, () => {
      beforeEach(() => {
        cy.viewport(size);
      });

      it('should successfully login', () => {
        cy.server();
        cy.route('POST', '/connect/token', {
          // eslint-disable-next-line @typescript-eslint/camelcase
          access_token: 'access_token',
          // eslint-disable-next-line @typescript-eslint/camelcase
          refresh_token: 'refresh_token',
        });
        cy.visit('/login');

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
        cy.visit('/login');

        cy.findByPlaceholderText('Username').type('invalid');
        cy.findByPlaceholderText('Password').type('credential');
        cy.findByText('Login').click();

        cy.findByText('Invalid username or password.').should('be.visible');
        cy.findByPlaceholderText('Username').click();
        cy.findByText('Invalid username or password.').should('not.exist');
      });
    });
  });
});
