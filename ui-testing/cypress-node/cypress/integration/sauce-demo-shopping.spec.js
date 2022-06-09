/// <reference types="cypress" />

import { SauceDemoLoginPage } from "../page-objects/sauce-demo-login-page"
import { SauceDemoProductsPage } from "../page-objects/sauce-demo-products-page"
import { SauceDemoCartPage } from "../page-objects/sauce-demo-cart-page"
import { SauceDemoCheckoutPage } from "../page-objects/sauce-demo-checkout-page"

describe('Online Shopping via Sauce Demo Site', () => {
    const loginPage = new SauceDemoLoginPage()
    const productsPage = new SauceDemoProductsPage()
    const shoppingCartPage = new SauceDemoCartPage()
    const checkoutPage = new SauceDemoCheckoutPage()

    it('should shop Sauce Demo', () => {
        loginPage.loadPage()
        // loginPage.enterCredentials('standard_user', 'secret_sauce')
        loginPage.enterCredentials(Cypress.env('UI_USER'), Cypress.env('UI_PASS'))
        loginPage.clickLoginButton()
        
        productsPage.getHeaderText().should('have.text','Products')

        productsPage.addItemToCart('backpack')
        productsPage.addItemToCart('onesie')
        productsPage.goToShoppingCart()

        shoppingCartPage.getHeaderText().should('have.text','Your Cart')

        shoppingCartPage.confirmAdditionToCart('backpack').should('be.visible')
        shoppingCartPage.confirmAdditionToCart('onesie').should('be.visible')

        shoppingCartPage.removeItemFromCart('backpack')
        shoppingCartPage.confirmRemovalFromCart('backpack').should('not.be.visible')
        shoppingCartPage.checkout()

        checkoutPage.getHeaderText().should('have.text','Checkout: Your Information')
        checkoutPage.enterInfo('John', 'Smith', '78701')
        checkoutPage.getHeaderText().should('have.text','Checkout: Overview')
        checkoutPage.finishCheckout()
        checkoutPage.getHeaderText().should('have.text','Checkout: Complete!')
        checkoutPage.goBackHome()        
    })

    it('should login to Sauce Demo', () => {
        loginPage.loadPage()
        loginPage.enterCredentials('standard_user', 'secret_sauce')
        loginPage.clickLoginButton()
        
        productsPage.getHeaderText().should('have.text','Products')
    })

    it('should shop then open shopping cart', () => {
        loginPage.loadPage()
        loginPage.enterCredentials('standard_user', 'secret_sauce')
        loginPage.clickLoginButton()
        
        productsPage.addItemToCart('backpack')
        productsPage.addItemToCart('onesie')
        productsPage.goToShoppingCart()

        shoppingCartPage.getHeaderText().should('have.text','Your Cart')

})
