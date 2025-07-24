/// <reference types='Cypress' />

import { automationExerciseTestData } from '../../support/utils/paraBankUtils';
import ParabankUserProfile from '../../support/PageObjects/pb_UserRegistration'
import '../../support/ParaBankCommands/cmdParaBank';

describe("Registration", () => {

    const userProfile = new ParabankUserProfile()

    beforeEach(() => {
        // Visit Registration Page
        cy.visit("https://parabank.parasoft.com/parabank/register.htm");
    })

    // Accessing Data Set from Fixture (Static)
    it('Keyboard Type | Register a User', () => {
        cy.get("input[id='customer.firstName']").should('be.visible').and('be.empty').type("Juan");
        cy.get("input[id='customer.lastName']").should('be.visible').and('be.empty').type("Dela Cruz");
        cy.get("input[id='customer.address.street']").should('be.visible').and('be.empty').type("Ayala");
        cy.get("input[id='customer.address.city']").should('be.visible').and('be.empty').type("Makati");
        cy.get("input[id='customer.address.state']").should('be.visible').and('be.empty').type("NCR");
        cy.get("input[id='customer.address.zipCode']").should('be.visible').and('be.empty').type("1600");
        cy.get("input[id='customer.phoneNumber']").should('be.visible').and('be.empty').type("09245642124");
        cy.get("input[id='customer.ssn']").should('be.visible').and('be.empty').type("4234562443");

        cy.get("input[id='customer.username']").should('be.visible').and('be.empty').type("juandcruz25");
        cy.get("input[id='customer.password']").should('be.visible').and('be.empty').type("Password");
        cy.get("input[id='repeatedPassword']").should('be.visible').and('be.empty').type("Password");

        cy.get("input[type='submit'][value='Register']").click();
        cy.title().should('eq', "ParaBank | Customer Created");
        cy.get('h1[class="title"]').should('contain', "Welcome juandcruz25")
    })

    // Accessing Data Set from Fixture (Static)
    it('Fixture | Register a User', () => {
        cy.fixture('RegistrationData').then((Userinput) => {
            cy.addUserFixture('')
        })
    })

    // Accessing Data Set from FakerJS (Dynamic)
    it.only('Faker | Register a User', () => {
        const Userinput = automationExerciseTestData()
        cy.get("input[id='customer.firstName']").should('be.visible').and('be.empty').type(Userinput.firstName);
        cy.get("input[id='customer.lastName']").should('be.visible').and('be.empty').type(Userinput.lastName);
        cy.get("input[id='customer.address.street']").should('be.visible').and('be.empty').type(Userinput.address);
        cy.get("input[id='customer.address.city']").should('be.visible').and('be.empty').type(Userinput.city);
        cy.get("input[id='customer.address.state']").should('be.visible').and('be.empty').type(Userinput.state);
        cy.get("input[id='customer.address.zipCode']").should('be.visible').and('be.empty').type(Userinput.zipCode);
        cy.get("input[id='customer.phoneNumber']").should('be.visible').and('be.empty').type(Userinput.mobileNumber);
        cy.get("input[id='customer.ssn']").should('be.visible').and('be.empty').type(Userinput.ssn);

        cy.get("input[id='customer.username']").should('be.visible').and('be.empty').type(Userinput.signUpName);
        cy.get("input[id='customer.password']").should('be.visible').and('be.empty').type(Userinput.password);
        cy.get("input[id='repeatedPassword']").should('be.visible').and('be.empty').type(Userinput.password);

        cy.get("input[type='submit'][value='Register']").click();
        cy.title().should('eq', "ParaBank | Customer Created");
        cy.get('h1[class="title"]').should('contain', "Welcome " + Userinput.signUpName)
    })


    // Verifying labels and its values using POM
    it('Verify field Display in registration page with POM', () => {
        userProfile.assertUserRegistrationlabels();
    })

    // Command contains the fixture to pass to the POM for inputting the User's Data
    it.only('Register User using POM and Command', () => {
        cy.addUserFixture();
    })
})

//C:\CypressLearn\Cypress_Project\cypress\e2e\Registration.cy.js