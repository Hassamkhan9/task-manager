describe('Task Manager', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the heading', () => {
    cy.contains('Task Manager').should('be.visible');
  });

  it('displays existing tasks', () => {
    cy.contains('Learn TypeScript').should('be.visible');
    cy.contains('Learn Docker Compose').should('be.visible');
  });

  it('adds a new task', () => {
    cy.get('input[placeholder="Add a new task"]').type('Write Cypress tests');
    cy.contains('Add').click();
    cy.contains('Write Cypress tests').should('be.visible');
  });

  it('deletes a task', () => {
    cy.contains('Learn TypeScript')
      .parent()
      .contains('Delete')
      .click();
    cy.contains('Learn TypeScript').should('not.exist');
  });
});