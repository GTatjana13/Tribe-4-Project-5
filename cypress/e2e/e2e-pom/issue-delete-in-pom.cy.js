/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";
const modalConfirm = '[data-testid="modal:confirm"]';

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    //Assert that detail modal is visible
    IssueModal.getIssueDetailModal();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    //Assert the issue is deleted
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);
  });

  it('Should cancel deletion process successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle); 
  });
});
