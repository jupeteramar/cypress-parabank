/// <reference types='Cypress' />

import '../../support/ParaBankCommands/cmdParaBank';
import { automationExerciseTestData } from '../../support/utils/paraBankUtils';


describe('User Account Management', () => {
    it("Log In Successfully", () => {
        cy.uLogin().wait(750)
        cy.url().should('contain', "/overview.htm");
    })

    // This test case is using the Test Data from the fixture file, fxt_ParaBank.json > UpdateUserInfo
    it("Update Profile with valid fields", () => {
        cy.fixture('fxt_ParaBank').then((userData) => {
            // Verify if the account is existing
            cy.verifyUserExistence()
            // Update the User's Profile
            cy.updateUserProfile('a[href="updateprofile.htm"]', userData)
        })
    })

    // Verify if a successful profile update
    it("Update Profile - Verify if user can register their name with numbers", () => {
        // User Data for updating the profile
        const userUpdateData = {
            "UpdateUserInfo": {
                "firstName": "John",
                "lastName": "Dela Cruz",
                "addressStreet": "Ayala",
                "addressCity": "Makati",
                "addressState": "NCR",
                "zipCode": "1600",
                "phoneNumber": "09245642124"
            }
        }
        cy.verifyUserExistence()
        cy.updateUserProfile('a[href="updateprofile.htm"]', userUpdateData)

        // cy.fixture('fxt_ParaBank').then((userUpdateData) => {

        // })
    })

    it("User Log Out", () => {
        cy.uLogin("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC", "juandcruz25", "Password", 'input[name="username"]', 'input[name="password"]', 'input[value="Log In"]')
        cy.url('contain', "/overview.htm")
        cy.screencapture("UserLogOut")
        cy.get('a[href="logout.htm"]').click()
        cy.screencapture("UserLogOut")
        cy.url('contain', "/index.htm")
    })
})