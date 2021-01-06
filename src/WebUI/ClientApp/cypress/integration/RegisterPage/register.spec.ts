describe('RegisterPage', () => {
  const sizes = ['iphone-4', 'ipad-mini', 'macbook-13'];

  sizes.forEach((size) => {
    describe(`viewport is [${size}]`, () => {
      beforeEach(() => {
        cy.visit('/register');
        cy.viewport(size);
      });

      it('should display unmatch password and confirm password', () => {
        cy.findByPlaceholderText('Password').type('abcdE123');
        cy.findByPlaceholderText('Confirm Password').type('abcdE1234').blur();

        cy.findByText('Confirm password is not the same as password.').should(
          'exist',
        );
      });

      it('should navigate to login page', () => {
        cy.findByText('Login').click();

        cy.title().should('contain', 'Login');
      });

      it('should able to create account successfully', () => {
        cy.server();
        cy.route('post', '/api/users', {});
        cy.route('post', '/connect/token', {});

        cy.findByPlaceholderText('Full Name').type('Juan');
        cy.findByPlaceholderText('Email Address').type('juan@mailinator.com');
        cy.findByPlaceholderText('Username').type('juan');
        cy.findByPlaceholderText('Password').type('abcdE123');
        cy.findByPlaceholderText('Confirm Password').type('abcdE123');
        cy.findByText('Register').click();

        cy.title().should('contain', 'Dashboard');
      });

      it('should display error message when account creation is failed', () => {
        cy.server();
        cy.route({
          method: 'POST',
          url: '/api/users',
          status: 400,
          response: { message: 'This is a sample error message from API.' },
        });

        cy.findByPlaceholderText('Full Name').type('Juan');
        cy.findByPlaceholderText('Email Address').type('juan@mailinator.com');
        cy.findByPlaceholderText('Username').type('juan');
        cy.findByPlaceholderText('Password').type('abcdE123');
        cy.findByPlaceholderText('Confirm Password').type('abcdE123');
        cy.findByText('Register').click();

        cy.findByText('This is a sample error message from API.');
      });
    });
  });
});
