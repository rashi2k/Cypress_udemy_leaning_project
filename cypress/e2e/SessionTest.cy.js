/// <reference types = "Cypress" />

describe("JWT Session", ()=>{
    it("sessionTest", ()=>{
        cy.LoginAPI().then(()=>{
            cy.visit("https://rahulshettyacademy.com/client",
            {
                onBeforeLoad: (window)=>{
                    window.localStorage.setItem('token', Cypress.env('token'));
                }
            })
        })
    })
} )