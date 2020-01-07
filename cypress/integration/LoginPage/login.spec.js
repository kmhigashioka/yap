describe('LoginPage', () => {
  it('should login', () => {
    cy.visit('/login');

    cy.findByPlaceholderText('Username').type('m2m');
    cy.findByPlaceholderText('Password').type('secret');
    cy.findByText('Login').click();

    cy.title().should('contain', 'Dashboard');
  });
});
