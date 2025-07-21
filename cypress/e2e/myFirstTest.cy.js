/// <reference types='Cypress' />

import '../support/ParaBankCommands/cmdParaBank';

describe('CSSLocators', () => {

    /*

    it('verify-title-positive', () => {
        cy.visit("http://opensource-demo.orangehrmlive.com/")
        cy.title().should('eq', 'OrangeHRM')
    })

    it('verify-title-negative', () => {
        cy.visit("http://opensource-demo.orangehrmlive.com/")
        cy.title().should('eq', 'OrangeHRM')
    })

    */

    function login(username, password) {
        cy.get("#user-name").type(username)
        cy.get("#password").type(password)
    };

    it.only('Log in correct credentials', () => {
        cy.uLogin("https://www.saucedemo.com/", "standard_user", "secret_sauce", "#user-name","#password","#login-button");
        cy.url().should('contain', '/inventory.html')
    })

    // it('Log in correct credentials', () => {
    //     cy.visit("https://www.saucedemo.com/")
    //     login("standard_user", "secret_sauce")
    //     // cy.get("#user-name").type("standard_user")
    //     // cy.get("#password").type("secret_sauce")
    //     cy.get("#login-button").click()
    //     //cy.get('.inventory-list > div').should('have.length', 6);
    //     cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    // })

    it('Log in no credentials input', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get("#login-button").click()
        //cy.get('.inventory-list > div').should('have.length', 6);
        cy.url().should('not.eq', 'https://www.saucedemo.com/inventory.html')
        cy.get("[data-test='error']").should('contain', 'Username is required')
    })

    it('Log in no password', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get("#user-name").type("standard_user")
        cy.get("#login-button").click()
        cy.url().should('not.eq', 'https://www.saucedemo.com/inventory.html')
        cy.get("[data-test='error']").should('contain', 'Password is required')
    })

    it('Log in no username', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()
        cy.url().should('not.eq', 'https://www.saucedemo.com/inventory.html')
        cy.get("[data-test='error']").should('contain', 'Username is required')
    })

})