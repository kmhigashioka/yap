/* eslint-disable @typescript-eslint/camelcase */
import { runOnSizes } from '../../common';

describe('LoginPage', () => {
  runOnSizes(() => {
    it('should successfully login', () => {
      cy.server();
      cy.route('POST', '/connect/token', {
        access_token: 'access_token',
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

    it('should skip the login and use as guest', () => {
      cy.intercept('POST', '/api/guests', {
        statusCode: 200,
        body: {},
      });
      cy.intercept('POST', '/connect/token', {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      });
      cy.intercept('GET', '/api/users/me', {
        body: {
          fullName: 'John Doe',
        },
      });
      cy.visit('/login');
      cy.findByText(/skip as guest/i).click();
      cy.findByText(/welcome, john doe!/i).should('be.visible');
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
      cy.findByText(/skip as guest/i).click();
      cy.findByText(errorMessage).should('be.visible');
    });
  });
});
