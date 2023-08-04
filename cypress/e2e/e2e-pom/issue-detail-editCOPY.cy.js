const priority = '[data-testid="select:priority"]';
const expectedLength = 5;
let priorityArray = [];
let arrayOfElements = [];
let reporterArray = [];
const regex = /^[A-Z a-z]*$/ ;
let containsOnlyLetters = [];
const issueTitle = (' Many spaces ');
let invokedTitle;
const trimmedTitle = issueTitle.trim();//.replace(/\s+/g, ' ');
describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
          .trigger('mouseover')
          .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get(priority).click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get(priority).should('have.text', 'Medium');
    });
  });

  it('Should update title, description successfully', () => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow')
        .click()
        .should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
      cy.get('.ql-snow').should('have.text', description);
    });
  });

  it('check priority dropdown',() =>{
    cy.get(priority).invoke('text').then((selectedValue) => {
      priorityArray.push(selectedValue);
      cy.log(`Added value: ${selectedValue}, Array length: ${priorityArray.length}`);
      cy.log(selectedValue)
    });
  
    // Open the dropdown list
    cy.get(priority).click()
  
    // Access the list of all priority options and loop through them
    cy.get('[data-testid^="select-option:"]').each((value) => {
      const valueText = value.text();
      priorityArray.push(valueText);
      cy.log(`Added value: ${valueText}, Array length: ${priorityArray.length}`);
  
      // Close the dropdown after adding the value to the array
    //cy.get(priority).click();
    cy.log(priorityArray.join(', '));
    })
    .then(() => {
      // Assert that the array has the same length as the predefined number
       expect(priorityArray.length).to.equal(expectedLength);
    }); 
  })

  it('cycle',() => {
    cy.get(priority).invoke('val').then((selectedValue) => {
      priorityArray.push(selectedValue);
      cy.log(`Added value: ${selectedValue}, Array length: ${priorityArray.length}`);
    })
    //Access the list of all priority options and loop through them
    cy.get('[data-testid^="select-option:"]').then(($options) => {
      const arrayOfElements = [];
    
      cy.wrap($options).each(($option) => {
        const optionText = $option.text();
        arrayOfElements.push(optionText);
        cy.log(`Added value: ${optionText}, Array length: ${arrayOfElements.length}`);
      });
    });
  })

  it('checking that reporter name has only characters in it',() =>{
    //invoke and print selected name
    cy.get('[data-testid="select:reporter"]').invoke('text').then((selectedReporter) =>{
      cy.log(`${selectedReporter}`);
      //make sure that name contains only characters and space
      containsOnlyLetters = regex.test(selectedReporter);
      expect(containsOnlyLetters).to.be.true;
    });
    //open dropdown list
    cy.get('[data-testid="select:reporter"]').click();
    //invoke and print other names
    cy.get('[data-testid^="select-option:"]').each((reporter) => {
      const nameText = reporter.text();
      cy.log(nameText); 
      //make sure that names contain only characters and space
      containsOnlyLetters = regex.test(nameText);
      expect(containsOnlyLetters).to.be.true;
    });
  });


  it('check priority dropdown',() =>{
    cy.get(priority).invoke('text').then((selectedValue) => {
      priorityArray.push(selectedValue);
      cy.log(`Added value: ${selectedValue}, Array length: ${priorityArray.length}`);
    });
  
    // Open the dropdown list
    cy.get(priority).click()//'bottomRight');
  
    // Access the list of all priority options and loop through them
    cy.get('[data-testid^="select-option:"]').each((value) => {
      const valueText = value.text();
      priorityArray.push(valueText);
      cy.log(`Added value: ${valueText}, Array length: ${priorityArray.length}`);
  
    cy.log(priorityArray.join(', '));
    })
    .then(() => {
      // Assert that the array has the same length as the predefined number
       expect(priorityArray.length).to.equal(expectedLength);
    }); 
  });



  it('trenning',() =>{
    //get selected value and print
    cy.get('[data-testid="select:priority"]').invoke('text').then((selectedValue) => {
      priorityArray.push(selectedValue);
      cy.log(`${selectedValue}, ${priorityArray.length}`)
    });
    //open the dropdown list
    cy.get(priority).click();
    //get all other values and print
    cy.get('[data-testid^="select-option:"]').each((value) => {
      const valueText = value.text();
      priorityArray.push(valueText);
      cy.log(`${valueText},${priorityArray.length}`);
      //print all values in one row
      cy.log(priorityArray.join(', '));
    })
    //assert the expected lengh is the same as array length
    .then(() =>{
      expect(priorityArray.length).to.equal(expectedLength)
    });
  });
  
  it.only('should remove unnecessary spaces from issue title',() => {
    closeTheIssue();
    createIssue();
    cy.wait(10000);
    cy.get('[data-testid="board-list:backlog"]').should('be.visible');
    cy.reload();
    cy.get('[data-testid="list-issue"]').first().invoke('text').then((invokedIssueTitle) =>{
      invokedTitle = invokedIssueTitle.trim();
      expect(trimmedTitle).to.equal(invokedTitle);
    });
  });


  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
});

function createIssue() {
  cy.get('[data-testid="icon:plus"]').click();
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="select-option:Bug"]').trigger('click');
    cy.get('.ql-editor').type('some description');
    cy.get('input[name="title"]').type(issueTitle);
    cy.get('button[type="submit"]').click();
  });
}
function closeTheIssue() {
  cy.get('[data-testid="modal:issue-details"]').within(() => {
    cy.get('[data-testid="icon:close"]').first().click();
  });
}
