/// <reference types = "Cypress" />

describe('cypress http mock', () => {

    it("mock libaray api", () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }, (req) =>{
            req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhothra";

            req.continue((res) =>{
                expect(res.statusCode).to.equal(404)
            })
          
        }).as('interceptUrl')

        cy.get("button[class='btn btn-primary']").click();
        
        //length of the response array = rows of the table 
        cy.wait('@interceptUrl');
    })
})