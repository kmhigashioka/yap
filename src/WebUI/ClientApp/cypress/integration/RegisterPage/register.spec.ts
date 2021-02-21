import { runOnSizes } from '../../common';

const pageRoute = '/register';

describe('RegisterPage', () => {
  runOnSizes(() => {
    it('should navigate to login page', () => {
      cy.visit(pageRoute);
      cy.findByText('Login').click();

      cy.title().should('contain', 'Login');
    });

    it('should able to create account successfully', () => {
      cy.intercept('POST', '/api/users', { body: {} });
      cy.intercept('POST', '/connect/token', { body: {} });
      cy.visit(pageRoute);

      cy.findByPlaceholderText('Full Name').type('Juan');
      cy.findByPlaceholderText('Email Address').type('juan@mailinator.com');
      cy.findByPlaceholderText('Username').type('juan');
      cy.findByPlaceholderText('Password').type('abcdE123');
      cy.findByPlaceholderText('Confirm Password').type('abcdE1234').blur();
      cy.findByText('Confirm password is not the same as password.').should(
        'exist',
      );
      cy.findByPlaceholderText('Confirm Password').clear().type('abcdE1234');
      cy.findByText('Register').click();

      cy.findByText(/welcome/i, { timeout: 60000 }).should('be.visible');
    });

    it('should display error message when account creation is failed', () => {
      cy.intercept('POST', '/api/users', {
        statusCode: 400,
        body: { message: 'This is a sample error message from API.' },
      });
      cy.visit(pageRoute);

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
