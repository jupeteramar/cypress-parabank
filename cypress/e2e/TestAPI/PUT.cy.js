/// <reference types='Cypress' />

import '../../support/ParaBankCommands/cmdParaBank';

describe('PUT  Requests', () => {
    it('200 - PUT Update User Data', () => {
        cy.request({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/user/rumrum', // Pet Store API
            body: {
                "id": 0,
                "username": "rumrum",
                "firstName": "Johnny",
                "lastName": "Depp",
                "email": "jdepp@disney",
                "password": "arrr",
                "phone": "123",
                "userStatus": 1
            },
            failOnStatusCode: false
        }).then((response) => {
            // ✅ Assert status
            expect(response.status).to.eq(200);

            // ✅ Assert response headers
            expect(response.headers['content-type']).to.include('application/json');

            // ✅ Assert response body
            cy.log(JSON.stringify(response.body))
            // expect(response.body).to.have.property('id');
            // expect(response.body).to.have.property('username');
            // expect(response.body).to.have.property('firstName');
            // expect(response.body).to.have.property('lastName');
            // expect(response.body).to.have.property('email');
            // expect(response.body).to.have.property('password');
            // expect(response.body).to.have.property('phone');
            // expect(response.body).to.have.property('userStatus');
        });
    });

    it('400 - PUT Update User Data', () => {
        cy.request({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/user/[%7B%25%7D]', // Pet Store API
            body: [],
            failOnStatusCode: false
        }).then((response) => {
            // ✅ Assert status
            expect(response.status).to.eq(400);

            // ✅ Assert response headers
            //expect(response.headers['content-type']).to.include('application/json');

            // ✅ Assert response body
            cy.log(JSON.stringify(response.body))
        });
    });

    it('500 - PUT Update User Data', () => {
        cy.request({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/user/rumrum', // Pet Store API
            body: [],
            failOnStatusCode: false
        }).then((response) => {
            // ✅ Assert status
            expect(response.status).to.eq(500);

            // ✅ Assert response headers
            //expect(response.headers['content-type']).to.include('application/json');

            // ✅ Assert response body
            cy.log(JSON.stringify(response.body))
        });
    });

    // it.only('200 - PUT Update Pet Data', () => {
    //     cy.request({
    //         method: 'PUT',
    //         url: 'https://petstore.swagger.io/v2/pet', // Pet Store API
    //         body: {
    //             "id": 50,
    //             "category": {
    //                 "id": 50,
    //                 "name": "string"
    //             },
    //             "name": "Scoooby",
    //             "photoUrls": [
    //                 "string"
    //             ],
    //             "tags": [
    //                 {
    //                     "id": 0,
    //                     "name": "string"
    //                 }
    //             ],
    //             "status": "available"

    //         },
    //         failOnStatusCode: false
    //     }).then((response) => {
    //         // ✅ Assert status
    //         expect(response.status).to.eq(200);

    //         // ✅ Assert response headers
    //         expect(response.headers['content-type']).to.include('application/json');

    //         // ✅ Assert response body
    //         cy.log(JSON.stringify(response.body)).then(() => {
    //             expect(response.body).to.have.property('id');
    //             expect(response.body).to.have.property('name');
    //             expect(response.body).to.have.property('status');
    //             expect(response.body).to.have.property('photoUrls');
    //             expect(response.body).to.have.property('category');
    //         })

    //     });
    // });
});