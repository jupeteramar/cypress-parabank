# 🧪 ParaBank Cypress Test Suite

This project contains automated end-to-end (E2E) tests written using [Cypress](https://www.cypress.io/). It is designed to ensure the reliability and correctness of core user flows in the application.
It tests different modules of the ParaBank website including Registration, Authentication, Account Management, and Bank Transactions.

---

## 📁 Project Structure
├── e2e/ 
| ├── ParaBank # specs
│   └── BankTransactions.cy.js
│   └── YserAccount.cy.js
│   └── UserRegistration.cy.js
├── fixtures #static data
│   └── fxt_ParaBank.json
├── support/ # Custom commands & setup
│ ├── ParaBankCommands
│   └── cmdParaBank.js
│ └── e2e.js


## ✅ Required Dependencies
1. Cypress (core dependency)
  npm install cypress --save-dev

##🚦Running Test
npx run open

## 🧵Test Scripts
parabank-transact-headed
parabank-transact-headless
parabank-user-headed
parabank-user-headless



## 🧩 Custom Commands
Custom Cypress commands can be found in:
cypress/support/ParaBankCommands/cmdParaBank.js

These may include:

  cy.addNewSavingsAccount()
	
  cy.registerFixtureUser()
	
  cy.transferFund()


## 📄 Fixtures
Fixtures are JSON files containing test data and are located in cypress/fixtures/.

Example usage:

cy.fixture('userData').then((user) => {
  cy.get('input[name="username"]').type(user.username);
});

## 📚 Documentation & Resources
[Cypress Documentation](https://docs.cypress.io/)


