/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

import 'cypress-iframe';

describe('open in new tab or window  example', function () {

    it('Open window ', function () {

        //Check boxes
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#opentab').then((el) => {
            const url = el.prop('href');
            cy.visit(url);
        })

        // if we do not want to check the mouse hover happeing  and just wnt to click on the link. Then we can use 
        //cy.contains('Top').click({force: true})
    })

    it('open iframe', ()=>{
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.frameLoaded('#courses-iframe')

        cy.iframe().find("a[href='mentorship']").eq(0).click();
    })
})
