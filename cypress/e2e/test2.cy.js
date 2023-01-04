/// <reference types = "Cypress" />

describe('First Suit', ()=>{
  it('test case 2', ()=>{
    // open the url
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.wait(2000);
    cy.get('.search-keyword').type('ca');
   
    // iteration through array and do some function 
    cy.get('.products').find('.product').each(($el, index, $list) =>{
     var productName =  $el.find('.product-name').text();
      if(productName.includes('Cashews')){
        cy.wrap($el).find('button').click();
      }
    })

    cy.get('.cart-icon > img').click();
    cy.contains("PROCEED TO CHECKOUT").click();
    cy.contains("Place Order").click();
  })

  //cy.log(cy.get('.brand').text()) or var logo =cy.get('.brand').text(); cy.log(logo) // these will not work, because text() is not cypress method, it is 
  // jquery method. so the promie not have resolved. 
  // To take the element to a variable, to reuse it we have to use alias method as()
  
  // cy.get('.products').as('prodcutslocator')
  // cy.get('prodcutslocator').find()xxxxx
});