/// <reference types='Cypress' />

import '../../support/ParaBankCommands/cmdParaBank';
import { automationExerciseTestData } from '../../support/utils/paraBankUtils';


describe('User Account Management', () => {
    it("Log In Successfully", () => {
        cy.uLogin().wait(750)
        cy.url().should('contain', "/overview.htm");
    })

    // This test case is using the Test Data from the fixture file, ParaBankUserData.json > UpdateUserInfo
    it("Update Profile with valid fields", () => {
        cy.fixture('ParaBankUserData').then((userData) => {
            // Verify if the account is existing
            cy.verifyUserExistence()
            // Update the User's Profile
            cy.updateUserProfile('a[href="updateprofile.htm"]', userData)
        })
    })

    it.only("Update Profile - Verify if user can register their name with numbers", () => {
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

        // cy.fixture('ParaBankUserData').then((userUpdateData) => {

        // })
    })
})