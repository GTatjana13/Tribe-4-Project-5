//import { faker, it } from '@faker-js/faker';
//const randomTitle = faker.word.words(1);
/*describe('Issue deleting', () => {
    
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

  it.only('trying different commands'),(=>{
    cy.findAllByText('Each issue has a single reporter but can have multiple assignees.').click();
  })
  });
});*/
const numberOfPriorities = 5;
 //task #4, workshop #17
 it(`Check, that priority fields has ${numberOfPriorities} values`, () => {
 let priorities = [];
 //add already chosen priority to the list
 cy.get('[data-testid="select:priority"]').invoke('text').then((extractedPriority) => {
 priorities.push(extractedPriority);
 })
 //click to open priority dropdown - options
 cy.get('[data-testid="select:priority"]').click();
 //get number of options from the page
 cy.get('[data-select-option-value]').then(($options) => {
 const itemCount = Cypress.$($options).length;
 //iterate through the options and
 //add text from each option to the list
 for (let index = 0; index < itemCount; index++) {
 cy.get('[data-select-option-value]')
 .eq(index).invoke('text').then((extractedPriority) => {
 priorities.push(extractedPriority);
 if (index == (itemCount - 1)) {
 cy.log("TOTAL calculated array length: " + priorities.length);
 expect(priorities.length).to.be.eq(numberOfPriorities);
 }
 });
 };
 });
 });