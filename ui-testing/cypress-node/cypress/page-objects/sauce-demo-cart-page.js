/// <reference types="cypress" />

export class SauceDemoCartPage {
    getHeaderText() {
        return cy.get('.title').should('be.visible')
    }

    confirmAdditionToCart(item) {
        return cy.get(`#remove-sauce-labs-${item}`)
    }

    removeItemFromCart(item) {
        cy.get(`#remove-sauce-labs-${item}`).should('be.visible')
            .click() 
    }
}
