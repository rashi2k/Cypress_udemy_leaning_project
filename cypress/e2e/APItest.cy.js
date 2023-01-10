/// <reference types = "Cypress" />

describe('First Suit', () => {
    it('test case 1', () => {
        cy.request('POST', "https://rahulshettyacademy.com/Library/Addbook.php", {
            "name": "Basic Java",
            "isbn": "1201",
            "aisle": "1201",
            "author": "Rashini"
        }).then((response) => {
            expect(response.body).to.have.property("Msg", "successfully added");
            expect(response.status).to.equal(200);
        })

    })

})