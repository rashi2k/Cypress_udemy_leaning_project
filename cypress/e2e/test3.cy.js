/// <reference types = "Cypress" />

describe('First Suit', ()=>{
  it('test case 3 comob boxes and dropdowns', ()=>{
    // open the url
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.wait(2000);
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1');
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
    cy.get('input[type=checkbox]').check(['option2', 'option3']);
    //static dropdowns
    cy.get('select').select('option2').should('have.value', 'option2');

    cy.get('#autocomplete').type('ind');
    // dynamic dropdown
    cy.get('.ui-menu-item div').each(($el, index, $list)=>{
      if($el.text() === "India"){
        cy.wrap($el).click();
      }
    })

    // check the above selection is correctly done

    cy.get('#autocomplete').should('have.value', 'India');

    // handle visibility of textbox with button click
    cy.get('#displayed-text').should('be.visible')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')

    //radio buttons
 
    cy.get('[value="radio2"]').check().should('be.checked')
  })
});