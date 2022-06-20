/// <reference types="cypress" />

export class SauceDemoCheckoutPage {
    getHeaderText() {
        return cy.get('.title').should('be.visible')
    }

    enterInfo(firstname, lastname, zipcode) {
        cy.get('#continue').should('be.visible')
        cy.get('#first-name')
            .type(firstname)
        cy.get('#last-name')
            .type(lastname)
        cy.get('#postal-code')
            .type(zipcode)
        cy.get('#continue')
            .click()   
    }
}
