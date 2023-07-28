//import { faker, it } from '@faker-js/faker';
//const randomTitle = faker.word.words(1);
describe('Issue deleting', () => {
    
  const modalIssueDetails = '[data-testid="modal:issue-details"]';
  const modalConfirm = '[data-testid="modal:confirm"]';
  const backlogList = '[data-testid="board-list:backlog"]';
  const listIssue = '[data-testid="list-issue"]';
  let getText;
  beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
      });
      //Opening the first issue
      cy.get(listIssue).first().next().click()
      cy.get(modalIssueDetails).should('be.visible')
      //invoke the issue name
      cy.get('[placeholder="Short summary"]').invoke('text').then((getText) => {
        //getText = value.text()
        cy.log(getText)
      })
  });

  it('Should delete first issue successfully', () => {
    cy.get(modalIssueDetails).within(() => {
      cy.get('[data-testid="icon:trash"]').click();  
    });
    //Confirm deletion 
    cy.get(modalConfirm).within(() => {
        cy.contains('button', 'Delete issue').click()
    });
    //Assert the pop-window disappeared
    cy.get(modalConfirm).should('not.exist');
    //Assert the issue is deleted from the board
    cy.get(backlogList).should('be.visible').and('have.length', '1').within(() => {
        cy.get(listIssue).should('not.contain',getText);
        cy.log(getText)

    });
  });
});
