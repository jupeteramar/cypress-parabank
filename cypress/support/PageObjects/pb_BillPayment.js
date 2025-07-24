class billsPayment {

    constructor() {
        this.labelsBillsPayment = [
            { selector: ':nth-child(1) > [align="right"] > b', text: "Payee Name:" },
            { selector: ':nth-child(2) > [align="right"] > b', text: "Address:" },
            { selector: ':nth-child(3) > [align="right"] > b', text: "City:" },
            { selector: ':nth-child(4) > [align="right"] > b', text: "State:" },
            { selector: ':nth-child(5) > [align="right"] > b', text: "Zip Code:" },
            { selector: ':nth-child(6) > [align="right"] > b', text: "Phone #:" },
            { selector: ':nth-child(8) > [align="right"] > b', text: "Account #:" },
            { selector: ':nth-child(9) > [align="right"] > b', text: "Verify Account #:" },
            { selector: ':nth-child(11) > [align="right"] > b', text: "Amount: $" },
            { selector: ':nth-child(13) > [align="right"] > b', text: "From account #:" }
        ],
            this.inputBillsPayment = [
                { selector: ':nth-child(1) > [width="20%"] > .input', key: 'payeeName' },
                { selector: ':nth-child(2) > [width="20%"] > .input', key: 'addressStreet' },
                { selector: ':nth-child(3) > [width="20%"] > .input', key: 'addressCity' },
                { selector: ':nth-child(4) > [width="20%"] > .input', key: 'addressState' },
                { selector: ':nth-child(5) > [width="20%"] > .input', key: 'zipCode' },
                { selector: ':nth-child(6) > [width="20%"] > .input', key: 'phoneNumber' },
                { selector: ':nth-child(8) > :nth-child(2) > .input', key: 'accTo' },
                { selector: ':nth-child(9) > [width="20%"] > .input', key: 'accTo' },
                { selector: ':nth-child(11) > [width="20%"] > .input', key: 'amount' },
                { selector: ':nth-child(13) > :nth-child(2) > .input', key: 'accFrom' }
            ]


    } // end of Constructor


    // Check if values of labels are correct
    assertBillsPaymentLabels() {
        this.labelsBillsPayment.forEach((label) => {
            cy.get(label.selector).should('have.text', label.text);
        });
    }

    // Check if values of inputs are correct
    assertBillsPaymentInputs() {
        this.inputBillsPayment.forEach((input) => {
            cy.get(input.selector).should('be.enabled');
        });
    }

    // Pay Bill Transaction
    // payBill(userData, ssfilename) {
    //     var n = 0; // Screenshot Index        

    //     cy.screencapture(`${ssfilename} `, (n += 1));
    //     // Fill in all the fields
    //     this.inputBillsPayment.forEach((field) => {
    //         const value = userData[field.key];

    //         if (field.selector === ":nth-child(13) > :nth-child(2) > .input") {
    //             cy.get(field.selector).select(value);
    //         } else {
    //             cy.get(field.selector).clear().type(value);
    //         }
    //     });

    //     // Gather the values AFTER all inputs
    //     cy.then(() => {
    //         const gathered = {};
    //         cy.screencapture(`${ssfilename} `, (n += 1));
    //         return cy.get(':nth-child(11) > :nth-child(2) > .input').invoke('val').then((amt) => {
    //             gathered.amt = amt.trim();
    //             return cy.get(':nth-child(1) > [width="20%"] > .input').invoke('val');
    //         }).then((payee) => {
    //             gathered.payee = payee.trim();
    //             return cy.get(':nth-child(13) > :nth-child(2) > .input').invoke('val');
    //         }).then((accFrom) => {
    //             gathered.accFrom = accFrom.trim();

    //             cy.log(`Gathered: ${gathered.payee}, $${gathered.amt}, ${gathered.accFrom}`);

    //             cy.get(':nth-child(14) > :nth-child(2) > .button').click().wait(500);
    //             this.verifySuccessfulPayment(gathered);
    //             cy.screencapture(`${ssfilename} `, (n += 1));
    //         });
    //     });
    // }

    payBill(userData, ssfilename) {
        let n = 0;
        const gathered = {};

        cy.screencapture(`${ssfilename}`, ++n);

        this.inputBillsPayment.forEach((field) => {
            const value = userData[field.key];

            if (field.selector === ":nth-child(13) > :nth-child(2) > .input") {
                cy.get(field.selector).select(value);
            } else {
                cy.get(field.selector).clear().type(value);
            }
        });

        // Start Cypress chain and return it
        return cy.get(':nth-child(11) > :nth-child(2) > .input').invoke('val').then((amt) => {
            gathered.amt = amt.trim();
            return cy.get(':nth-child(1) > [width="20%"] > .input').invoke('val');
        }).then((payee) => {
            gathered.payee = payee.trim();
            return cy.get(':nth-child(13) > :nth-child(2) > .input').invoke('val');
        }).then((accFrom) => {
            gathered.accFrom = accFrom.trim();

            // Submit and capture final state
            cy.get(':nth-child(14) > :nth-child(2) > .button').click().wait(500);
            cy.screencapture(`${ssfilename}`, ++n);

            // Return final result through Cypress chain
            return cy.wrap(gathered);
        });
    }

    verifySuccessfulPayment(paymentDetails) {
        const paymentInfo = [
            { element: 'span[id="payeeName"]', value: paymentDetails.payee },
            { element: 'span[id="amount"]', value: paymentDetails.amt },
            { element: 'span[id="fromAccountId"]', value: paymentDetails.accFrom }
        ]

        paymentInfo.forEach((span) => {
            cy.get(span.element).should('contain', span.value);
        })

        cy.get('h1[class="title"]').should('be.visible').and('contain', "Bill Payment Complete")
    }
}

export default billsPayment;