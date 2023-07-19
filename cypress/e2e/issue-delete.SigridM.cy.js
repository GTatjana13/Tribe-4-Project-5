

describe('Issue delete', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
            cy.visit(url + '/board');
            cy.get('[data-testid="board-list:backlog"]').children().eq(0).click();
        });
    });

//Test 1
    it('Should delete first issue from the board', () => {
        //Click on the delete button
        cy.get('[data-testid="icon:trash"]').click();
        //Confirmation dialouge appears, then confirm the deletion
        cy.contains('Are you sure you want to delete this issue?').should('be.visible');
        cy.contains('Delete issue').should('be.visible').click()
        cy.get('[data-testid="modal:confirm"]').should('not.exist')
        //Issue is not visible
        cy.contains('This is an issue of type: Task.').should('not.exist')

    });
//Test 2
    it('Should click first issue from the board for deletion but cancel action', () => {
        cy.get('[data-testid="modal:issue-details"]').should('be.visible')
        //Click on the delete button
        cy.get('[data-testid="icon:trash"]').click();
        //Confirmation dialouge appears, then cancel the deletion
        cy.contains('Are you sure you want to delete this issue?').should('be.visible');
        cy.contains('Cancel').should('be.visible').click()
        cy.get('[data-testid="modal:confirm"]').should('not.exist')
        //Issue is still visible on the board
        cy.get('[data-testid="icon:close"]').first().click();
        cy.contains('This is an issue of type: Task.').should('be.visible')

    });
});