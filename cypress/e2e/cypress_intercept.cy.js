/// <reference types = "Cypress" />

describe('cypress http mock', () => {

    it("mock libaray api", () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }, {
            statusCode: 200,
            body: [
                {
                    "book_name": "null",
                    "isbn": "SPY40",
                    "aisle": "2529857"
                }
            ]
        }).as('bookRetrievals')

        cy.get("button[class='btn btn-primary']").click();
        //cy.wait('@bookRetrievals');

        //length of the response array = rows of the table 
        cy.wait('@bookRetrievals').then(({ request, response }) =>{
             cy.get('tr').should('have.length', response.body.length + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available');

    })
})