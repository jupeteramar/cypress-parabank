import { ur } from "@faker-js/faker";
import pbRegistration from '../../support/PageObjects/pb_UserRegistration'

const registerPOM = new pbRegistration();

var today = new Date();
const formatToday = today.toDateString().replace(/^\w+ /, '') + ' - ' + today.toTimeString().slice(0, 5);

Cypress.Commands.add('verifyUserExistence', () => {
    cy.uLogin().wait(1000)
    cy.url({ timeout: 5000 }).then((currentUrl) => {
        // verify if the account is existing
        if (currentUrl.includes('/overview.htm')) {
            // User exist
            cy.log('User found');
        } else {
            // User does not exist
            cy.log('User not found');
            cy.addUserFixture();
        }
    })
})

Cypress.Commands.add('uLogin', () => {
    cy.fixture('ParaBankUserData').then((userData) => {
        cy.visit("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC");
        cy.get('input[name="username"]').type(userData.UserInfo.username);
        cy.get('input[name="password"]').type(userData.UserInfo.password);
        cy.get('input[value="Log In"]').click();
    })
    //cy.screenshot('ParaBank-LogIn-Success (' + today +')', { capture: 'viewport' });
})

Cypress.Commands.add('screencapture', (name) => {
    var filename = `PB_${name}`;
    cy.screenshot(filename, { capture: 'fullPage' });
})


// Register a New User
Cypress.Commands.add('addUserFixture', () => {
    cy.visit("https://parabank.parasoft.com/parabank/register.htm");
    cy.fixture('ParaBankUserData').then((userData) => {
        registerPOM.registerNewUserPOM(userData.UserInfo);

        /*
        cy.get("input[id='customer.firstName']").should('be.visible').and('be.empty').type(userData.UserInfo.firstName);
        cy.get("input[id='customer.lastName']").should('be.visible').and('be.empty').type(userData.UserInfo.lastName);
        cy.get("input[id='customer.address.street']").should('be.visible').and('be.empty').type(userData.UserInfo.addressStreet);
        cy.get("input[id='customer.address.city']").should('be.visible').and('be.empty').type(userData.UserInfo.addressCity);
        cy.get("input[id='customer.address.state']").should('be.visible').and('be.empty').type(userData.UserInfo.addressState);
        cy.get("input[id='customer.address.zipCode']").should('be.visible').and('be.empty').type(userData.UserInfo.zipCode);
        cy.get("input[id='customer.phoneNumber']").should('be.visible').and('be.empty').type(userData.UserInfo.phoneNumber);
        cy.get("input[id='customer.ssn']").should('be.visible').and('be.empty').type(userData.UserInfo.ssn);

        cy.get("input[id='customer.username']").should('be.visible').and('be.empty').type(userData.UserInfo.username);
        cy.get("input[id='customer.password']").should('be.visible').and('be.empty').type(userData.UserInfo.password);
        cy.get("input[id='repeatedPassword']").should('be.visible').and('be.empty').type(userData.UserInfo.password);
        */

        cy.get("input[type='submit'][value='Register']").click();
        cy.title().should('eq', "ParaBank | Customer Created");
        cy.get('h1[class="title"]').should('contain', "Welcome " + userData.UserInfo.username)
    })
})

// Adding new Bank Account
Cypress.Commands.add('addNewAccount', (accType, ssFilename) => {
    var n = 0;
    var newAID;
    cy.url('contain', "/overview.htm")
    cy.screencapture(`${ssFilename} (${formatToday}) ${n += 1}`)
    cy.get('a[href="openaccount.htm"]').click().wait(500)
    cy.url('contain', "/openaccount.htm")
    cy.get('#type').select(accType)
    cy.screencapture(`${ssFilename} (${formatToday}) ${n += 1}`)
    cy.get('#fromAccountId').select(0)
    cy.get('form > div > .button').click().wait(500)
    cy.screencapture(`${ssFilename} (${formatToday}) ${n += 1}`).wait(500)
    cy.get('#newAccountId').then(($accID) => {
        newAID = $accID.text().trim();

        cy.log(`New Account ID: ${newAID}`)
        cy.get('a[href="overview.htm"]').click()
        cy.get('#accountTable').contains(newAID).should('exist')
    })
    cy.screencapture(`${ssFilename} (${formatToday}) ${n += 1}`);
})

Cypress.Commands.add('updateUserProfile', (url, userObjectData) => {
    var ssFilename = "UpdateUserProfile";
    var n = 0;
    cy.get(url).click().wait(2000)
    cy.screencapture(`${ssFilename} (${formatToday}) ${n += 1}`)
    cy.url('contain', "/updateprofile.htm")
    cy.get('input[name="customer\.firstName"]').clear().type(userObjectData.UpdateUserInfo.firstName)
    cy.get('input[name="customer\.lastName"]').clear().type(userObjectData.UpdateUserInfo.lastName)
    cy.get('input[name="customer\.address\.street"]').clear().type(userObjectData.UpdateUserInfo.addressStreet)
    cy.get('input[name="customer\.address\.city"]').clear().type(userObjectData.UpdateUserInfo.addressCity)
    cy.get('input[name="customer\.address\.state"]').clear().type(userObjectData.UpdateUserInfo.addressState)
    cy.get('input[name="customer\.address\.zipCode"]').clear().type(userObjectData.UpdateUserInfo.zipCode)
    cy.get('input[name="customer\.phoneNumber"]').clear().type(userObjectData.UpdateUserInfo.phoneNumber)
    cy.get('input[value="Update Profile"]').click().wait(1000)
    cy.screencapture(`${ssFilename} (${formatToday}) ${n += 1}`).wait(500)
    cy.get('h1[class="title"]').should('contain', "Profile Updated")
    cy.viewUserProfile(url, userObjectData);
    cy.screencapture(`${ssFilename} (${formatToday}) ${n += 1}`)
})

Cypress.Commands.add("viewUserProfile", (url, userObjectData) => {
    cy.get(url).click().wait(2000)
    cy.get('a[href="updateprofile.htm"]').click().wait(500)
    cy.get('input[name="customer\.firstName"]').should('have.value', userObjectData.UpdateUserInfo.firstName).invoke('val').should((text) => {
        expect(/\d/.test(text)).to.be.false;
    });
    cy.get('input[name="customer\.lastName"]').should('have.value', userObjectData.UpdateUserInfo.lastName).invoke('val').should((text) => {
        expect(/\d/.test(text)).to.be.false;
    });
    cy.get('input[name="customer\.address\.street"]').should('have.value', userObjectData.UpdateUserInfo.addressStreet)
    cy.get('input[name="customer\.address\.city"]').should('have.value', userObjectData.UpdateUserInfo.addressCity)
    cy.get('input[name="customer\.address\.state"]').should('have.value', userObjectData.UpdateUserInfo.addressState)
    cy.get('input[name="customer\.address\.zipCode"]').should('have.value', userObjectData.UpdateUserInfo.zipCode)
    cy.get('input[name="customer\\.phoneNumber"]')
        .should('have.value', userObjectData.UpdateUserInfo.phoneNumber)
        .invoke('val')
        .should((value) => {
            expect(/^[\d#-]+$/.test(value)).to.be.true;
        });
})