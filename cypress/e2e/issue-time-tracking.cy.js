import { faker } from '@faker-js/faker';
const randomDescription = faker.lorem.sentence();
const randomTitle = faker.word.words(1);
const issueDetailModal = '[data-testid="modal:issue-details"]';
const listIssue = '[data-testid="list-issue"]';
const modalTracking = () => cy.get('[data-testid="modal:tracking"]');
const timeEstimationValue = () => cy.get('[placeholder="Number"]');
const iconStopwatch = () => cy.get('[data-testid="icon:stopwatch"]');

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

function addTimeEstimation(time){
  timeEstimationValue()
      .trigger('mouseover')
      .trigger('click').clear().type(`${time}`)
}

describe('Time estimation functionality and time logging functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`)
    .then((url) => {
    createIssue(randomTitle, randomDescription)
    cy.wait(2000);
    //cy.contains(randomTitle).click();
    });
  });

  it('Should add, update and remove estimation', () => {
    cy.contains(randomTitle).click();
    //Add estimation
    addTimeEstimation(10);
      //reopen issue and make sure the time is saved
    reopenTheIssue();
    timeEstimationValue().should('have.value',10);
    //update estimation
    addTimeEstimation(20);
    reopenTheIssue();
    timeEstimationValue().should('have.value',20);
    //remove estimation
    timeEstimationValue()
      .trigger('mouseover')
      .trigger('click').clear();
      reopenTheIssue();
    //reopen issue and ensure that estimation is removed
    timeEstimationValue().should('not.have.value');
  });

  it('Should log time and remove time',() =>{
    cy.contains(randomTitle).click();
    addTimeEstimation(10);
    //Log time
    iconStopwatch().click();
    modalTracking().should('be.visible');
    timeEstimationValue().eq(1).click().clear().type(2);
    timeEstimationValue().eq(2).click().type(5);
    cy.contains('button', 'Done').click();
    modalTracking().should('not.exist');
    //Make sure the time is logged
    iconStopwatch().next()
      .should('contain','2h logged')
      .should('contain','5h remaining');
    //Remove time
    iconStopwatch().click();
    modalTracking().should('be.visible');
    timeEstimationValue().eq(1).click().clear();
    timeEstimationValue().eq(2).click().clear();
    cy.contains('button', 'Done').click();
    modalTracking().should('not.exist');
    //Make sure the time is removed and original estimation is visible
    iconStopwatch().next()
      .should('contain','No time logged');
    cy.contains('10h estimated').should('be.visible');
  });
});