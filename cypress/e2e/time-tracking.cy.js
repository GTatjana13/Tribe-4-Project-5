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

function reopenTheIssue() {
  cy.get(issueDetailModal).within(() => {
    cy.get('[data-testid="icon:close"]').first().click();
  });
  cy.wait(2000);
  cy.get(listIssue).first().click();
}

describe('Time estimation functionality and time logging functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    });
    createIssue(randomTitle, randomDescription)
    cy.wait(2000);
    cy.contains(randomTitle).click();
  });

  it('Should add, update and remove estimation', () => {
    //Add estimation
    cy.get('input[placeholder="Number"]')
      .trigger('mouseover')
      .trigger('click').clear().type(10);
      //reopen issue and make sure the time is saved
    reopenTheIssue();
    cy.get('input[placeholder="Number"]').should('have.value',10);
    //update estimation
    cy.get('input[placeholder="Number"]')
      .trigger('mouseover')
      .trigger('click').clear().type(20);
      //reopen issue and ensure that time is updated
    reopenTheIssue();
    cy.get('input[placeholder="Number"]').should('have.value',20);
    //remove estimation
    cy.get('input[placeholder="Number"]')
      .trigger('mouseover')
      .trigger('click').clear();
      reopenTheIssue();
    //reopen issue and ensure that estimation is removed
    cy.get('input[placeholder="Number"]').should('not.have.value');
  });

  it('Should log time and remove time',() =>{
    //Log time
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get(modalTracking).should('be.visible');
    cy.get('[placeholder="Number"]').eq(1).click().clear().type(2);
    cy.get('[placeholder="Number"]').eq(2).click().type(5);
    cy.contains('button', 'Done').click();
    cy.get(modalTracking).should('not.exist');
    //Make sure the time is logged
    cy.get('[data-testid="icon:stopwatch"]').next()
      .should('contain','2h logged')
      .should('contain','5h remaining');
    //Remove time
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get(modalTracking).should('be.visible');
    cy.get('[placeholder="Number"]').eq(1).click().clear();
    cy.get('[placeholder="Number"]').eq(2).click().clear();
    cy.contains('button', 'Done').click();
    cy.get(modalTracking).should('not.exist');
    //Make sure the time is removed
    cy.get('[data-testid="icon:stopwatch"]').next()
      .should('contain','No time logged');
  });
});