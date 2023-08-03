const priority = '[data-testid="select:priority"]';
const expectedLength = 5;
let priorityArray = [];
let arrayOfElements = [];
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
    cy.get(priority).click()//'bottomRight');
  
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

 /* it('another method',() =>{
      cy.get(priority),each(($el) =>{
        cy.wrap($el).click();
       // cy.get(#input).invoke('val').then(val => {
          arrayOfElements.push(val);
        })
        then(() =>{
          console.log(arrayOfElements);
        })
      }).then(() =>{
        console.log(arrayOfelements).as('myArray1')
      })

      cy.get('@myArray1').then(myArray1 => {
        cy.get('@myArray2').then(myArray2 => {

        })
      

    });


  });*/
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



  it.only('trenning',() =>{
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
    
    
  })


  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
});
