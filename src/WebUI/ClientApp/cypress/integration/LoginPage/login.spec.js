describe('LoginPage', () => {
  it('should successfully login', () => {
    cy.visit('/login');

    cy.findByPlaceholderText('Username').type('m2m');
    cy.findByPlaceholderText('Password').type('secret');
    cy.findByText('Login').click();

    cy.title().should('contain', 'Dashboard');
  });

  it('should display error message when using invalid credential', () => {
    cy.visit('/login');

    cy.findByPlaceholderText('Username').type('invalid');
    cy.findByPlaceholderText('Password').type('credential');
    cy.findByText('Login').click();

    cy.findByText('Invalid username or password.').should('be.visible');
    cy.findByPlaceholderText('Username').click();
    cy.findByText('Invalid username or password.').should('not.be.visible');
  });
});
