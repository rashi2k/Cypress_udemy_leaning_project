/// <reference types = "Cypress" />

describe('First Suit', ()=>{
  it('test case 1', ()=>{
    // open the url
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.wait(2000);
    cy.get('.search-keyword').type('ca');
    cy.get('.product').should('have.length', 5); // there is one invisible product element
    cy.get('.product:visible').should('have.length', 4); // method one
    // parent child chaining
    cy.get('.products').as('products-locator');
    cy.get('@products-locator').find('.product').should('have.length', 4);
    cy.get('@products-locator').find('.product').eq(1).contains('ADD TO CART').click();

    // iteration through array and do some function 
    cy.get('.products').find('.product').each(($el, index, $list) =>{
     var productName =  $el.find('.product-name').text();
      if(productName.includes('Cashews')){
        cy.wrap($el).find('button').click();
      }
    })

    //assertion for text
    cy.get('.brand').should('have.text', "GREENKART");

    // use promises TO PRINT LOGS
    cy.get('.brand').then(element =>{
      cy.log(element.text());
    })
  })

  //cy.log(cy.get('.brand').text()) or var logo =cy.get('.brand').text(); cy.log(logo) // these will not work, because text() is not cypress method, it is 
  // jquery method. so the promie not have resolved. 
  // To take the element to a variable, to reuse it we have to use alias method as()
  
  // cy.get('.products').as('prodcutslocator')
  // cy.get('prodcutslocator').find()xxxxx
});