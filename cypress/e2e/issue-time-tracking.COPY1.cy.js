import { faker } from '@faker-js/faker';
const randomDescription = faker.lorem.sentence();
const randomTitle = faker.word.words(1);
const issueDetailModal = '[data-testid="modal:issue-details"]';
const listIssue = '[data-testid="list-issue"]';
const modalTracking = '[data-testid="modal:tracking"]';

function createIssue(randomTitle, randomDescription) {
  cy.get('[data-testid="icon:plus"]').click();
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="select-option:Bug"]').trigger('click');
    cy.get('.ql-editor').type(randomDescription);
    cy.get('input[name="title"]').type(randomTitle);
    cy.get('button[type="submit"]').click();
  });
}

function closeTheIssue() {
  cy.get(issueDetailModal).within(() => {
    cy.get('[data-testid="icon:close"]').first().click();
  });
}

describe('Time estimation functionality and time logging functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    });
  });

  it('Should create a ticket, add estimation, log time and remove time', () => {
    //To receive issue without time added into time tracker we need newly created issue
    createIssue(randomTitle, randomDescription)
    //Add estimation
    cy.contains(randomTitle).click();
    cy.get('input[placeholder="Number"]')
      .trigger('mouseover')
      .trigger('click').clear().type(10);
    closeTheIssue();
    //Cypress is faster then Jira clone and system needs time for updating
    cy.wait(2000);
    //Reopen issue and ensure that time is saved
    cy.contains(randomTitle).click();
    cy.get('input[placeholder="Number"]').should('have.value',10);
    //Log time and ensure that time is logged
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get(modalTracking).should('be.visible');
    cy.get('[placeholder="Number"]').eq(1).click().clear().type(2);
    cy.get('[placeholder="Number"]').eq(2).click().type(5);
    cy.contains('button', 'Done').click();
    cy.get(modalTracking).should('not.exist');
    cy.get('[data-testid="icon:stopwatch"]').next()
      .should('contain','2h logged')
      .should('contain','5h remaining');
    //Remove time and ensure that time is removed
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get(modalTracking).should('be.visible');
    cy.get('[placeholder="Number"]').eq(1).click().clear();
    cy.get('[placeholder="Number"]').eq(2).click().clear();
    cy.contains('button', 'Done').click();
    cy.get(modalTracking).should('not.exist');
    cy.get('[data-testid="icon:stopwatch"]').next()
      .should('contain','No time logged');
  });

  it('Should update estimation',() =>{
    cy.get(listIssue).first().click();
    //Rewrite estimation
    cy.get('input[placeholder="Number"]')
      .trigger('mouseover')
      .trigger('click').clear().type(20);
    closeTheIssue();
    cy.wait(2000);
    //reopen issue and ensure that time is updated
    cy.get(listIssue).first().click();
    cy.get('input[placeholder="Number"]').should('have.value',20);
  });

  it('Should remove estimation',() =>{
    cy.get(listIssue).first().click();
    //remove estimation
    cy.get('input[placeholder="Number"]')
      .trigger('mouseover')
      .trigger('click').clear();
      closeTheIssue();
    cy.wait(2000);
    //reopen issue and ensure that Placeholder “Number” is visible
    cy.get(listIssue).first().click();
    cy.get('input[placeholder="Number"]').should('not.have.value');
  });

  it('Should log time and remove time',() =>{
    cy.contains(randomTitle).click();
    //cy.get(listIssue).first().click();
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get(modalTracking).should('be.visible');
    cy.get('[placeholder="Number"]').eq(1).click().clear().type(2);
    cy.get('[placeholder="Number"]').eq(2).click().type(5);
    cy.contains('button', 'Done').click();
    cy.get(modalTracking).should('not.exist');
    cy.get('[data-testid="icon:stopwatch"]').next()
      .should('contain','2h logged')
      .should('contain','5h remaining');

    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get(modalTracking).should('be.visible');
    cy.get('[placeholder="Number"]').eq(1).click().clear();
    cy.get('[placeholder="Number"]').eq(2).click().clear();
    cy.contains('button', 'Done').click();
    cy.get(modalTracking).should('not.exist');
    cy.get('[data-testid="icon:stopwatch"]').next()
      .should('contain','No time logged');
  });
});