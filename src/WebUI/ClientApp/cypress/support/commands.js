import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  cy.route('POST', '/connect/token', {});
});
