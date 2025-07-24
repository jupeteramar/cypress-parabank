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

    assertUserRegistrationlabels() {
        this.labelList.forEach((label) => {
            cy.get(label.selector).should('have.text', label.text);
        });
    }

    inputFirstName() {
        cy.get("input[id='customer.firstName']").should('be.visible').and('be.empty').type(userData.UserInfo.firstName);
    }

}

export default UserRegistration;