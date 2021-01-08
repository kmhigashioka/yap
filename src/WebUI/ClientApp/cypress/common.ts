const sizes = ['iphone-4', 'ipad-mini', 'macbook-13'];

const runOnSizes = (tests: (size: string) => void): void => {
  sizes.forEach((size) => {
    describe(`Running on [${size}]`, () => {
      beforeEach(() => {
        cy.viewport(size);
      });

      tests(size);
    });
  });
};

export { runOnSizes };
