import { login, runOnSizes } from '../../common';

describe('LoginPage', () => {
  runOnSizes(() => {
    it('should successfully login', () => {
      login('/login');

      cy.findByPlaceholderText('Username').type('m2m');
      cy.findByPlaceholderText('Password').type('secret');
      cy.findByText('Login').click();

      cy.findByText(/welcome/i, { timeout: 60000 }).should('be.visible');
    });

    it('should display error message when using invalid credential', () => {
      cy.intercept('POST', '/connect/token', {
        statusCode: 400,
        body: {},
      });
      cy.visit('/login');

      cy.findByPlaceholderText('Username').type('invalid');
      cy.findByPlaceholderText('Password').type('credential');
      cy.findByText('Login').click();

      cy.findByText('Invalid username or password.').should('be.visible');
      cy.findByPlaceholderText('Username').click();
      cy.findByText('Invalid username or password.').should('not.exist');
    });

    it('should skip the login and use as guest', () => {
      cy.intercept('POST', '/api/guests', {
        statusCode: 201,
        body: {},
      });
      login('/login', {
        overrides: {
          '/api/users/me': { fullName: 'Guest' },
          '/api/users/accounts': [],
        },
      });
      cy.findByText(/skip as guest/i).click();
      cy.findByText(/welcome, guest!/i, { timeout: 60000 }).should(
        'be.visible',
      );
    });

    it('should toast the error message when skip as guest button is clicked: part 1', () => {
      const errorMessage = 'Something went wrong.';
      cy.intercept('POST', '/api/guests', {
        statusCode: 400,
        body: {
          message: errorMessage,
        },
      });
      cy.visit('/login');
      cy.findByText(/skip as guest/i).click();
      cy.findByText(errorMessage).should('be.visible');
    });

    it('should toast the error message when skip as guest button is clicked: part 2', () => {
      const errorMessage = 'Something went wrong.';

      cy.intercept('POST', '/api/guests', {
        statusCode: 200,
        body: {},
      });
      cy.intercept('POST', '/connect/token', {
        statusCode: 400,
        body: {
          message: errorMessage,
        },
      });
      cy.visit('/login');
      cy.findByText(/skip as guest/i).click();
      cy.findByText(errorMessage).should('be.visible');
    });
  });
});
