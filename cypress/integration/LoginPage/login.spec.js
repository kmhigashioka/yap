describe('LoginPage', () => {
  it('should login', () => {
    cy.visit('/login');

    cy.findByPlaceholderText('Username').type('myfancyusername');
    cy.findByPlaceholderText('Password').type('password');
    cy.findByText('Login').click();
  });
});
