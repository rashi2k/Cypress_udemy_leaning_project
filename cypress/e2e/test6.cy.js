/// <reference types="Cypress" />

describe('Mouse hover data example', function () {

    it('Mouse hover ', function () {

        //Check boxes
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include', 'top')

        // if we do not want to check the mouse hover happeing  and just wnt to click on the link. Then we can use 
        //cy.contains('Top').click({force: true})
    })
})
