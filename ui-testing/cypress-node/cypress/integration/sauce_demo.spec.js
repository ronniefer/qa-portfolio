/// <reference types="cypress" />

it('should navigate and shop the Sauce Demo site', () => {
    cy.visit('https://www.saucedemo.com/')
    
    cy.get('#user-name').type(Cypress.env('UI_USER'))
    cy.get('#password').type(Cypress.env('UI_PASS'))
    cy.get('#login-button').click()

    cy.get('.title').should('have.text','Products') 
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#add-to-cart-sauce-labs-onesie').click()
    cy.get('.shopping_cart_link').click()

    cy.get('.title').should('have.text','Your Cart') 
    cy.get('#remove-sauce-labs-backpack').should('be.visible')
    cy.get('#remove-sauce-labs-onesie').should('be.visible')
    cy.get('#remove-sauce-labs-backpack').click()
    cy.get('#remove-sauce-labs-backpack').should('not.be.visible')
    cy.get('#checkout').click()
    
    cy.get('#first-name').type('John')
    cy.get('#last-name').type('Smith')
    cy.get('#postal-code').type('78701')
    cy.get('#continue').click()

    cy.get('#finish').click()
    cy.get('#back-to-products').click()
})
