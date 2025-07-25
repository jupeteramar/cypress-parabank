import { ur } from "@faker-js/faker";
import pbRegistration from '../../support/PageObjects/pb_UserRegistration'
import pbBillsPayment from '../../support/PageObjects/pb_BillPayment'


const registerPOM = new pbRegistration();
const payeeData = new pbBillsPayment();

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
    cy.fixture('fxt_Parabank').then((userData) => {
        cy.visit("https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC");
        cy.get('input[name="username"]').type(userData.UserInfo.username);
        cy.get('input[name="password"]').type(userData.UserInfo.password);
        cy.get('input[value="Log In"]').click();
    })
    //cy.screenshot('ParaBank-LogIn-Success (' + today +')', { capture: 'viewport' });
})

Cypress.Commands.add('screencapture', (name, index) => {
    var filename = `PB_${name} (${formatToday}) ${index}`;
    cy.screenshot(filename, { capture: 'fullPage' });
})


// Register a New User
Cypress.Commands.add('addUserFixture', () => {
    cy.visit("https://parabank.parasoft.com/parabank/register.htm");
    cy.fixture('fxt_Parabank').then((userData) => {
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
            .then(() => {
                cy.get('a[href="overview.htm"]').click().wait(50)
            })
    })
})

// Adding new Bank Account
Cypress.Commands.add('addNewAccount', (accType, ssFilename) => {
    var n = 0;
    var newAID;
    cy.url('contain', "/overview.htm")
    cy.screencapture(`${ssFilename}`, (n += 1))
    cy.get('a[href="openaccount.htm"]').click().wait(500)
    cy.url('contain', "/openaccount.htm")
    cy.get('#type').select(accType)
    cy.screencapture(`${ssFilename}`, (n += 1))
    cy.get('#fromAccountId').select(0)
    cy.get('form > div > .button').click().wait(500)
    cy.screencapture(`${ssFilename}`, (n += 1)).wait(500)
    cy.get('#newAccountId').then(($accID) => {
        newAID = $accID.text().trim();

        cy.log(`New Account ID: ${newAID}`)
        cy.get('a[href="overview.htm"]').click()
        cy.get('#accountTable').contains(newAID).should('exist')
    })
    cy.screencapture(`${ssFilename}`, (n += 1));
})

Cypress.Commands.add('updateUserProfile', (url, userObjectData) => {
    var ssFilename = "UpdateUserProfile";
    var n = 0;
    cy.get(url).click().wait(2000)
    cy.screencapture(`${ssFilename}`, (n += 1))
    cy.url('contain', "/updateprofile.htm")
    cy.get('input[name="customer\.firstName"]').clear().type(userObjectData.UpdateUserInfo.firstName)
    cy.get('input[name="customer\.lastName"]').clear().type(userObjectData.UpdateUserInfo.lastName)
    cy.get('input[name="customer\.address\.street"]').clear().type(userObjectData.UpdateUserInfo.addressStreet)
    cy.get('input[name="customer\.address\.city"]').clear().type(userObjectData.UpdateUserInfo.addressCity)
    cy.get('input[name="customer\.address\.state"]').clear().type(userObjectData.UpdateUserInfo.addressState)
    cy.get('input[name="customer\.address\.zipCode"]').clear().type(userObjectData.UpdateUserInfo.zipCode)
    cy.get('input[name="customer\.phoneNumber"]').clear().type(userObjectData.UpdateUserInfo.phoneNumber)
    cy.get('input[value="Update Profile"]').click().wait(1000)
    cy.screencapture(`${ssFilename}`, (n += 1)).wait(500)
    cy.get('h1[class="title"]').should('contain', "Profile Updated")
    cy.viewUserProfile(url, userObjectData);
    cy.screencapture(`${ssFilename}`, (n += 1))
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

Cypress.Commands.add("payBill", (ssf) => {
    return cy.fixture('fxt_Parabank').then((userData) => {
        cy.log(userData.PayBillData);
        return payeeData.payBill(userData.PayBillData, ssf);
    });
});


Cypress.Commands.add("payBillInvalidInputs", () => {
    var ssFilename = "BillsPayment"
    cy.get('a[href="billpay.htm"]').click().wait(500)
    cy.fixture('fxt_Parabank').then((userData) => {
        cy.log(userData.PayBillData);
        payeeData.payBill(userData.PayBillData)
    });
})

Cypress.Commands.add("getBankAccount", (accIndex) => {
    const bankAccData = {};
    return cy.get(`tbody > :nth-child(${accIndex}) > :nth-child(1) > a`).invoke('text').then((id) => {
        bankAccData.id = id.trim();
        return bankAccData.id;
    }).then(() => {
        return cy.get(`tbody > :nth-child(${accIndex}) > :nth-child(2)`).invoke('text').then((bal) => {
            bankAccData.bal = parseFloat(bal.replace('$', '').trim()).toFixed(2);
            return bankAccData.bal;
        }).then(() => {
            //cy.log(bankAccData);
            return bankAccData;
        })
    })
})

Cypress.Commands.add("getBalance", (accIndex) => {
    return cy.get(`tbody > :nth-child(${accIndex}) > :nth-child(2)`).invoke('text').then((text) => {
        const balance = parseFloat(text.replace('$', '').trim());
        return balance;
    });
});

Cypress.Commands.add("getTotalBalance", () => {
    let total = 0;
    var rowCount;
    cy.get('a[href="overview.htm"]').click()
    cy.get('#accountTable tbody tr')
        .should('have.length.greaterThan', 2)
        .then(($rows) => {
            rowCount = $rows.length - 1; // Skip last row

            // Use slice to select only rows except the last one
            Cypress._.slice($rows, 0, rowCount).forEach(($row, index) => {
                cy.wrap($row)
                    .find('td:nth-child(2)')
                    .invoke('text')
                    .then((text) => {
                        const balance = parseFloat(text.replace('$', '').trim());
                        total += balance;
                        //cy.log(`Row ${index + 1} Balance: ${balance.toFixed(2)}`);
                    });
            });
        })
        .then(() => {
            //cy.log(`✅ Total (excluding last row): $${total.toFixed(2)}`);
            cy.get(`:nth-child(2) > b`).should('contain', total.toFixed(2))
        });
});

// Cypress.Commands.add('performTransfer', ((accFrom, accTo, amount)) => {

// })


Cypress.Commands.add('transferFund', (accFrom, accTo, amount) => {
    cy.getBankAccount(accFrom).then(accdata1 => { // Get details of Sender of Fund
        //cy.log(`AccFrom: ${accdata1.id} | $${accdata1.bal}`);
        cy.getBankAccount(accTo).then((accdata2) => { // Get Receiver of Sender of Fund
            //cy.log(`AccTo: ${accdata2.id} | $${accdata2.bal}`)
            cy.get('a[href="transfer.htm"]').click().wait(200)
                .then(() => {
                    cy.get('#amount').clear().type(amount)
                    cy.get('#fromAccountId').select(accdata1.id)
                    cy.get('#toAccountId').select(accdata2.id)
                    cy.get('input[type="submit"]').click().wait(100)
                        .then(() => {
                            cy.get('#showResult').should('contain', "Transfer Complete!")
                            cy.get('#amountResult').should('contain', `$${amount.toFixed()}`)
                            cy.get('#fromAccountIdResult').should('contain', accdata1.id)
                            cy.get('#toAccountIdResult').should('contain', accdata2.id)
                        })
                })
        })
    });
})

Cypress.Commands.add('transferFundComputation', (accFrom, accTo, amount) => {
    cy.getBankAccount(accFrom)
        .then(accdata1 => { // Get details of Sender of Fund
            //cy.log(`AccFrom: ${accdata1.id} | $${accdata1.bal}`);
            cy.getBankAccount(accTo)
                .then((accdata2) => { // Get Receiver of Sender of Fund
                    //cy.log(`AccTo: ${accdata2.id} | $${accdata2.bal}`)
                    cy.get('a[href="transfer.htm"]').click().wait(200)
                        .then(() => {
                            cy.get('#amount').clear().type(amount)
                            cy.get('#fromAccountId').select(accdata1.id)
                            cy.get('#toAccountId').select(accdata2.id)
                            cy.get('input[type="submit"]').click().wait(100)
                                .then(() => {
                                    cy.get('#showResult').should('contain', "Transfer Complete!")
                                    cy.get('#amountResult').should('contain', `$${amount.toFixed(2)}`)
                                    cy.get('#fromAccountIdResult').should('contain', accdata1.id)
                                    cy.get('#toAccountIdResult').should('contain', accdata2.id)
                                    cy.get('a[href="overview.htm"]').click().wait(100).then(() => {
                                        const prevbal1 = Number(parseFloat(accdata1.bal).toFixed(2));
                                        const prevbal2 = Number(parseFloat(accdata2.bal).toFixed(2));

                                        const amt = Number(amount.toFixed(2));
                                        const newbal1 = Number((prevbal1 - amt).toFixed(2));
                                        const newbal2 = Number((prevbal2 + amt).toFixed(2));

                                        cy.get(`tbody > :nth-child(${accFrom}) > :nth-child(2)`).should('contain', newbal1);
                                        cy.get(`tbody > :nth-child(${accTo}) > :nth-child(2)`).should('contain', newbal2);
                                    })

                                })
                        })
                })
        });
})

Cypress.Commands.add('loanApplication', (loanAmount, downpayment, fromAcc) => {
    cy.getBankAccount(fromAcc)
        .then((accData) => {
            cy.get('a[href="requestloan.htm"]').click().wait(100)
                .then(() => {
                    cy.get('#amount').clear().type(loanAmount)
                    cy.get('#downPayment').clear().type(downpayment)
                    cy.get('#fromAccountId').select(accData.id)
                    cy.get('input[value="Apply Now"]').click().wait(50)
                        .then(() => {
                            cy.get('h1[class="title"]').should('be.visible').and('contain', "Loan Request Processed")
                            cy.get('#loanStatus').should('be.visible').and('contain', "Approved")
                            cy.get('#newAccountId').invoke('text').then((newAccID) => {
                                cy.log(`New Loan Account: ${newAccID}`);
                            })
                        })
                })
        })
})

Cypress.Commands.add('getTransaction', (accIndex) => {
    var transactionData = {};
    cy.getBankAccount(accIndex).then((accData) => {
        //cy.log(JSON.stringify(accData));
        cy.get(`a[href="activity.htm?id=${accData.id}"]`).click().wait(50)
            .then(() => {
                cy.get('tbody > :nth-child(1) > :nth-child(2) > a').click()
                    .then(() => {
                        cy.get('tbody > :nth-child(1) > :nth-child(2)').invoke('text').then((tID) => {
                            transactionData.id = tID;
                            cy.get('tbody > :nth-child(2) > :nth-child(2)').invoke('text').then((tDate) => {
                                transactionData.date = tDate;
                                cy.get(':nth-child(5) > :nth-child(2)').invoke('text').then((tamt) => {
                                    transactionData.amount = tamt;
                                    cy.log(JSON.stringify(transactionData));
                                })
                            })
                        })
                    })
            })
    })
})