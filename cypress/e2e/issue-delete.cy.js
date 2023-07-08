import IssueModal from "../pages/IssueModal.js";
  
    const modalConfirm = '[data-testid="modal:confirm"]';
     
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        //System will already open issue modal in beforeEach block  
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        });
      });


    it('Delete the issue successfully', () => {

        IssueModal.clickDeleteButton()
        IssueModal.confirmDeletion()

        //Assert the pop-window disappeared
        cy.get(modalConfirm).should('not.exist');

        //Assert the issue is deleted
        IssueModal.ensureIssueIsNotVisibleOnBoard('This is an issue of type: Task.')

    });

    
    it('Starting the deleting issue process, but cancelling this action', () => {
       
        IssueModal.getIssueDetailModal() 
        IssueModal.clickDeleteButton()
        IssueModal.cancelDeletion()
        IssueModal.closeDetailModal()
        IssueModal.ensureIssueIsVisibleOnBoard('This is an issue of type: Task.')
        
    });

        

