/// <reference types='Cypress' />

function VisitOrangeHRM() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    cy.url('eq', "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
}

function LogInUser(username, password) {
    VisitOrangeHRM();
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(username);
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(password);
    cy.get('.orangehrm-login-button').should('be.visible').click();
}

describe("Log In Page UI Assertion", () => {
    it("Assert display of labels, fields and buttons in homepage", () => {
        // Assert if company logo is visible
        VisitOrangeHRM();
        cy.get('.orangehrm-login-branding > img').should('be.visible');

        //Assert if Page Title is visible
        cy.get('.orangehrm-login-title').should('be.visible').and('contain', "Login");

        // --- LOGIN FORM ---
        // Username label and input        
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label').should('be.visible').and('contain', "Username");
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled');

        // Password label and input
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label').should('be.visible').and('contain', "Password");
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('be.enabled');

        // Log in button
        cy.get('.orangehrm-login-button').should('be.visible').and('contain', "Login").and('be.enabled');
        // --- End of LOGIN FORM ---

        // Forgot Password
        cy.get('.orangehrm-login-forgot > .oxd-text').should('be.visible').and('contain', "Forgot your password");

        // Version label
        cy.get('.orangehrm-copyright-wrapper > :nth-child(1)').should('be.visible').and('contain', "OrangeHRM OS 5.7");

        // Copyright label
        cy.get('.orangehrm-copyright-wrapper > :nth-child(2)').should('be.visible').and('contain', "© 2005 - 2025 OrangeHRM, Inc. All rights reserved.")
    })


})

describe("Log In Function", () => {
    it('Assert a Successful Login', () => {
        LogInUser("Admin", "admin123");
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    })

    it('Assert an Unsuccessful Login', () => {
        LogInUser("Admin", "WrongPassword");
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').and('not.eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        cy.get('.oxd-alert--error').should('be.visible');
    })

    it('Assert an Unsuccessful Login with Blank Input', () => {
        VisitOrangeHRM();
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.empty');
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.empty');
        cy.get('.orangehrm-login-button').should('be.visible').click();
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').and('not.eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('be.visible');
        cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('be.visible');
    })
})