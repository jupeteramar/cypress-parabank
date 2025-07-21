/// <reference types='Cypress' />

import '../../support/ParaBankCommands/cmdParaBank';



describe('Account Management', () => {

    it("Open New Savings Account", () => {
        cy.fixture('ParaBankUserData').then((userData) => {
            cy.verifyUserExistence()
            cy.addNewAccount(1, "AddNewSavingsAccount");
        })
    })


})

it.only("Open New Checking Account", () => {
    cy.fixture('ParaBankUserData').then((userData) => {
        cy.verifyUserExistence()
        cy.addNewAccount(0, "AddNewCheckingAccount");
    })
})

it("User Log Out", () => {
    cy.uLogin("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC", "juandcruz25", "Password", 'input[name="username"]', 'input[name="password"]', 'input[value="Log In"]')
    cy.url('contain', "/overview.htm")
    cy.screencapture("UserLogOut")
    cy.get('a[href="logout.htm"]').click()
    cy.screencapture("UserLogOut")
    cy.url('contain', "/index.htm")
})
