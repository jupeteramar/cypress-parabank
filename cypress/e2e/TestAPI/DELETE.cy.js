/// <reference types='Cypress' />

import '../../support/ParaBankCommands/cmdParaBank';

describe('DELETE Requests', () => {
    it('200 - DELETE Order', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/store/order/22', // Pet Store API
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            failOnStatusCode: false
        }).then((response) => {
            // ✅ Assert response status
            expect(response.status).to.eq(200); // sometimes 204 or 202 depending on the API
            cy.log(JSON.stringify(response.body))
            // ✅ Assert response body is empty (common in DELETE)
            //expect(response.body).to.be.empty;
        });
    });

    it('404 - DELETE User Unsuccessful (No User Found)', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/user/wowo', // Pet Store API
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                api_key: 123445
            },
            failOnStatusCode: false
        }).then((response) => {
            // ✅ Assert response status
            expect(response.status).to.eq(404); // sometimes 204 or 202 depending on the API

            // ✅ Assert response body is empty (common in DELETE)
            expect(response.body).to.be.empty;
        });
    });

    it('400 - DELETE User Unsuccessful (No User Found)', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/user/[%7B%25%7D]', // Pet Store API
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            failOnStatusCode: false
        }).then((response) => {
            // ✅ Assert response status
            expect(response.status).to.eq(400); // sometimes 204 or 202 depending on the API

            // ✅ Assert response body is empty (common in DELETE)
            expect(response.body).to.be.empty;
        });
    });

    it('200 - DELETE User Successful', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/user/musiquean', // Pet Store API
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            failOnStatusCode: false
        }).then((response) => {
            // ✅ Assert response status
            expect(response.status).to.eq(200); // sometimes 204 or 202 depending on the API

            // ✅ Assert response body is empty (common in DELETE)
            //expect(response.body).to.be.empty;
        });
    });

    it('200 - DELETE Order', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/store/order/22', // Pet Store API
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            failOnStatusCode: false
        }).then((response) => {
            // ✅ Assert response status
            expect(response.status).to.eq(200); // sometimes 204 or 202 depending on the API
            cy.log(JSON.stringify(response.body))
            // ✅ Assert response body is empty (common in DELETE)
            //expect(response.body).to.be.empty;
        });
    });


});