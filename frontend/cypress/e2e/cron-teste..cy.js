
describe('Testes', () => {
    
    it('deve conseguir criar um novo CRON', () => {

        cy.intercept('GET', '/api/crons', []).as('getEmptyCrons');
        cy.visit('http://localhost:3000');
        cy.wait('@getEmptyCrons');


        cy.get('button').contains('Novo CRON').click();

        cy.get('input[name="name"]').type('Novo CRON Simples');
        cy.get('input[name="url"]').type('http://localhost:3001/api/receiver');
        cy.get('select[name="httpMethod"]').select('POST');
        cy.get('input[name="schedule"]').type('*/5 * * * *');

        cy.get('button').contains('Guardar').click();


        cy.get('.modal').should('not.exist');

    });
});