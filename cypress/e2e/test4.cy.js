/// <reference types = "Cypress" />

describe('First Suit', ()=>{
    it('test case for alers', ()=>{
      // open the url
      cy.visit("http://qaclickacademy.com/practice.php");
      cy.wait(2000);

      cy.get('#alertbtn').click();
      cy.on('window:alert', (str)=>{
        expect(str).to.equal("Hello , share this practice page and share your knowledge");
      })

      cy.get('#confirmbtn').click();
      cy.on('window:confirm', (str)=>{
        expect(str).to.equal("Hello , Are you sure you want to confirm?");
      })

      cy.get('#opentab').invoke('removeAttr', 'target').click();

      //verify the url
      cy.url().should('include', 'rahulshettyacademy');
      cy.go('back');
    })

})