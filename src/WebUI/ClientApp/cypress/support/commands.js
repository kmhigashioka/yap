import '@testing-library/cypress/add-commands';

// Cypress.on('window:before:load', win => {
//   win.fetch = null;
// });

Cypress.Commands.add('login', () => {
  cy.route('POST', '/connect/token', {});
});
