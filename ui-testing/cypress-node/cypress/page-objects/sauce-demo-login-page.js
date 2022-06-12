/// <reference types="cypress" />

export class SauceDemoLoginPage {
    loadPage() {
        cy.visit('https://www.saucedemo.com')
    }
}
