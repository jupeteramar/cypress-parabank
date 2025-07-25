/// <reference types='Cypress' />

import '../../support/ParaBankCommands/cmdParaBank';
import pbBillsPayment from '../../support/PageObjects/pb_BillPayment'


beforeEach(() => {
    // Authentication
    cy.verifyUserExistence()
})


describe('Bank Transactions', () => {
    const payeeData = new pbBillsPayment();

    // BANK ACCOUNT CREATION
    it("Open New Savings Account", () => {
        cy.fixture('fxt_Parabank').then((userData) => {
            cy.addNewAccount(1, "AddNewSavingsAccount");
        })
    })


    it("Open New Checking Account", () => {
        cy.fixture('fxt_Parabank').then((userData) => {
            cy.addNewAccount(0, "AddNewCheckingAccount");
        })
    })
    // end of BANK ACCOUNT CREATION

    // BILLS PAYMENT
    it('Assert a Successful Bill Payment', () => {
        cy.get('a[href="billpay.htm"]').click().wait(500);

        cy.payBill("PayBillsValidInput").then((gatheredData) => {
            var verifyData = gatheredData
            // cy.log(`From it(): ${gatheredData.payee}, $${gatheredData.amt}, ${gatheredData.accFrom}`);
            //cy.payBillVerifySuccess("PB_PayBillsVerifySuccess", verifyData); IN PROGRESS
        });
    });

    it("Assert correctness of labels and accessibility of inputs", () => {
        cy.get('a[href="billpay.htm"]').click().wait(500);
        payeeData.assertBillsPaymentLabels();
        payeeData.assertBillsPaymentInputs();

    })

    it('Transfer Fund', () => {
        const sendMoney = {
            sendFrom: 1,
            sentTo: 2,
            amount: 10.00
        }
        cy.transferFund(sendMoney.sendFrom, sendMoney.sentTo, sendMoney.amount);
        // cy.get('a[href="billpay.htm"]').click().wait(500);
        // cy.payBill("PB_PayBillsValidInput");
    })

    it.only('Verify Transfer Fund Computation', () => {
        const sendMoney = {
            sendFrom: 1,
            sentTo: 2,
            amount: 10.00
        }
        cy.transferFundComputation(sendMoney.sendFrom, sendMoney.sentTo, sendMoney.amount);
        // cy.get('a[href="billpay.htm"]').click().wait(500);
        // cy.payBill("PB_PayBillsValidInput");
    })

    // it.only('Assert Accuracy of Fund Transfer Computation', () => {
    //     const sendMoney = {
    //         sendFrom: 1,
    //         sentTo: 2,
    //         amount: 10
    //     }
    //     cy.transferFund(sendMoney.sendFrom, sendMoney.sentTo, sendMoney.amount);
    //     // cy.get('a[href="billpay.htm"]').click().wait(500);
    //     // cy.payBill("PB_PayBillsValidInput");
    // })

    it('Check Total Balance', () => {
        cy.getBankAccount(1);
    })

    it('Loan Application', () => {
        const loan = {
            loanAmount: 50,
            downpayment: 10,
            accID: 1
        }
        cy.loanApplication(loan.loanAmount, loan.downpayment, loan.accID)
    })

    it('Find Transaction (via ID)', () => {
        cy.getTransaction(1);
    })
})

