// in test

describe('First Suit', () => {
    it('test case 1', () => {
        cy.task('uniqueRandomCodeGeneratorTask', { moduleName: 'Hello', codeLength:  4 }).then((data) => {
            cy.log("ddddd" , data)
        })
    })

})