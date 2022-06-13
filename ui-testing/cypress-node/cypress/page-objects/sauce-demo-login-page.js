/// <reference types="cypress" />

export class SauceDemoLoginPage {
    loadPage() {
        cy.visit('https://www.saucedemo.com')
    }

    enterCredentials(username, password) {
        cy.get('#user-name').should('be.visible')
            .type(username)
        cy.get('#password')
            .type(password, { log:false })
    }

    clickLoginButton() {
        cy.get('#login-button').should('be.visible')
            .click()
    }
}