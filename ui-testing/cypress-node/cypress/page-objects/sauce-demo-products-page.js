/// <reference types="cypress" />

export class SauceDemoProductsPage {
    getHeaderText() {
        return cy.get('.title').should('be.visible')
    }

    addItemToCart(item) {
        cy.get(`#add-to-cart-sauce-labs-${item}`).should('be.visible')
            .click()
    }
}
