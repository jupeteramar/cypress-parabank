class UserRegistration {

    constructor() {
        this.labelList = [
            { selector: ':nth-child(1) > [align="right"] > b', text: 'First Name:' },
            { selector: ':nth-child(2) > [align="right"] > b', text: 'Last Name:' },
            { selector: ':nth-child(3) > [align="right"] > b', text: 'Address:' },
            { selector: ':nth-child(4) > [align="right"] > b', text: 'City:' },
            { selector: ':nth-child(5) > [align="right"] > b', text: 'State:' },
            { selector: ':nth-child(6) > [align="right"] > b', text: 'Zip Code:' },
            { selector: ':nth-child(7) > [align="right"] > b', text: 'Phone #:' },
            { selector: ':nth-child(8) > [align="right"] > b', text: 'SSN:' },
            { selector: ':nth-child(10) > [align="right"] > b', text: 'Username:' },
            { selector: ':nth-child(11) > [align="right"] > b', text: 'Password:' },
            { selector: ':nth-child(12) > [align="right"] > b', text: 'Confirm:' }
        ],
            this.inputFields = [
                { selector: 'input[name="customer.firstName"]', key: 'firstName' },
                { selector: 'input[name="customer.lastName"]', key: 'lastName' },
                { selector: 'input[name="customer.address.street"]', key: 'addressStreet' },
                { selector: 'input[name="customer.address.city"]', key: 'addressCity' },
                { selector: 'input[name="customer.address.state"]', key: 'addressState' },
                { selector: 'input[name="customer.address.zipCode"]', key: 'zipCode' },
                { selector: 'input[name="customer.phoneNumber"]', key: 'phoneNumber' },
                { selector: 'input[name="customer.ssn"]', key: 'ssn' },
                { selector: 'input[name="customer.username"]', key: 'username' },
                { selector: 'input[name="customer.password"]', key: 'password' },
                { selector: 'input[id="repeatedPassword"]', key: 'password' }
            ]
    }

    registerNewUserPOM(userData) {
        this.inputFields.forEach((field) => {
            cy.get(field.selector).clear().type(userData[field.key]);
        });
    }

    checkAllLabelsUsingLoop() {
        this.labelList.forEach((label) => {
            cy.get(label.selector).should('have.text', label.text);
        });
    }

    inputFirstName() {
        cy.get("input[id='customer.firstName']").should('be.visible').and('be.empty').type(userData.UserInfo.firstName);
    }

    // Labels
    lblFirstName = ':nth-child(1) > [align="right"] > b';
    lblLastName = ':nth-child(2) > [align="right"] > b';
    lblAddress = ':nth-child(3) > [align="right"] > b';
    lblAddressCity = ':nth-child(4) > [align="right"] > b';
    lblAdressState = ':nth-child(5) > [align="right"] > b';
    lblZip = ':nth-child(6) > [align="right"] > b';
    lblPhoneNumber = ':nth-child(7) > [align="right"] > b';
    lblSSN = ':nth-child(8) > [align="right"] > b';

    lblUsername = ':nth-child(10) > [align="right"] > b';
    lblPassword = ':nth-child(11) > [align="right"] > b';
    lblConfirmPass = ':nth-child(12) > [align="right"] > b';

    // Inputs
    txtFirstName = 'input[id="customer.firstName"]';
    txtLastName = 'input[id="customer.lastName"]';
    txtAddress = 'input[id="customer.address.street"]';
    txtAddressCity = 'input[id="customer.address.city"]';
    txtAdressState = 'input[id="customer.address.zipCode"]';
    txtZip = 'input[id="customer.address.zipCode"]]';
    txtPhoneNumber = 'input[id="customer.phoneNumber"]';
    txtSSN = 'input[id="customer.ssn"]';

    txtUsername = 'input[id="customer.address.zipCode"]';
    txtPassword = 'input[id="customer.address.zipCode"]';
    txtConfirmPass = 'input[id="customer.address.zipCode"]';

    // Button
    btnRegister = 'input[type="submit"][value="Register"]';

    registerNewUser() {

    }

    checkAllLabelsUsingLoop() {
        this.labelList.forEach((label) => {
            cy.get(label.selector).should('have.text', label.text);
        });
    }

    checkLabelsVisibility() {
        cy.get(this.lblFirstName).should('be.visible').and
    }


}

export default UserRegistration;