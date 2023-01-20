/// <reference types = "Cypress" />

describe('First Suit', ()=>{
    it('test case 1', ()=>{
      // open the url
      cy.visit("https://ant.design/components/modal");
      cy.wait(2000);
      cy.get("#components-modal-demo-basic > .code-box-demo >button ").click();
    })
})