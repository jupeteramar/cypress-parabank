/// <reference types='Cypress' />

import '../../support/ParaBankCommands/cmdParaBank';


describe('GET Requests', () => {

    // it('200 - GET Order', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: 'https://petstore.swagger.io/v2/store/inventory', // Pet Store API
    //     }).then((response) => {
    //         // ✅ Assert status
    //         expect(response.status).to.eq(200);

    //         // ✅ Assert response headers
    //         expect(response.headers['content-type']).to.include('application/json');

    //         // ✅ Assert response body
    //         expect(response.body).to.have.property('sold');
    //         expect(response.body).to.have.property('string');
    //         expect(response.body).to.have.property('unavailable');
    //         expect(response.body).to.have.property('pending');
    //         expect(response.body).to.have.property('available');
    //         // expect(response.body).to.have.property('peric');

    //         // expect(response.body).to.have.property('name');
    //         // expect(response.body.name).to.be.a('string');
    //     });
    // });

    // it('404 - GET Order', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: 'https://petstore.swagger.io/v2/store/order/2525125', // Pet Store API
    //         failOnStatusCode: false,
    //     }).then((response) => {
    //         // ✅ Assert status
    //         expect(response.status).to.eq(404);

    //         // ✅ Assert response headers
    //         expect(response.headers['content-type']).to.include('application/json');

    //         // ✅ Assert response body
    //         // expect(response.body).to.have.property('id');
    //         // expect(response.body).to.have.property('petId');
    //         // expect(response.body).to.have.property('quantity');
    //         // expect(response.body).to.have.property('shipDate');
    //         // expect(response.body).to.have.property('status');
    //         // expect(response.body).to.have.property('complete');

    //         // expect(response.body).to.have.property('name');
    //         // expect(response.body.name).to.be.a('string');
    //     });
    // });

    it('200 - GET Specific Pet', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/2', // Pet Store API
            headers:{
                'api_key': 1234
            },
            failOnStatusCode: false,
        }).then((response) => {
            // ✅ Assert status
            expect(response.status).to.eq(200);

            // ✅ Assert response headers
            expect(response.headers['content-type']).to.include('application/json');
            cy.log(JSON.stringify(response.body));
            // ✅ Assert response body
        });
    });

    it('200 - GET Specific User', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/musique', // Pet Store API
            failOnStatusCode: false,
        }).then((response) => {
            // ✅ Assert status
            expect(response.status).to.eq(200);

            // ✅ Assert response headers
            expect(response.headers['content-type']).to.include('application/json');
            cy.log(JSON.stringify(response.body));
            // ✅ Assert response body
            cy.expect(response.body).to.have.property('id')
            cy.expect(response.body).to.have.property('username')
            cy.expect(response.body).to.have.property('firstName')
            cy.expect(response.body).to.have.property('lastName')
            cy.expect(response.body).to.have.property('email')
            cy.expect(response.body).to.have.property('password')
            cy.expect(response.body).to.have.property('phone')
            cy.expect(response.body).to.have.property('userStatus')
        });
    });

    it('404 - GET Specific User', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/johnsnowhite', // Pet Store API
            failOnStatusCode: false,
        }).then((response) => {
            // ✅ Assert status
            expect(response.status).to.eq(404);

            // ✅ Assert response headers
            //expect(response.headers['content-type']).to.include('application/json');
            cy.log(JSON.stringify(response.body));
            // ✅ Assert response body
            //cy.expect(response.body).to.have.property('id')
        });
    });

    it('400 - GET Specific User', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/[%7B%25%7D]', // Pet Store API
            failOnStatusCode: false,
        }).then((response) => {
            // ✅ Assert status
            expect(response.status).to.eq(400);

            // ✅ Assert response headers
            //expect(response.headers['content-type']).to.include('application/json');
            cy.log(JSON.stringify(response.body));
            // ✅ Assert response body
            //cy.expect(response.body).to.have.property('id')
        });
    });

    it('404 - GET Specific User', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/{}}', // Pet Store API
            failOnStatusCode: false,
        }).then((response) => {
            // ✅ Assert status
            expect(response.status).to.eq(404);

            // ✅ Assert response headers
            //expect(response.headers['content-type']).to.include('application/json');
            cy.log(JSON.stringify(response.body));
            // ✅ Assert response body
            //cy.expect(response.body).to.have.property('id')
        });
    });

    it('405 - GET Specific User', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/', // Pet Store API
            body: [],
            failOnStatusCode: false,
        }).then((response) => {
            // ✅ Assert status
            expect(response.status).to.eq(405);

            // ✅ Assert response headers
            //expect(response.headers['content-type']).to.include('application/json');
            cy.log(JSON.stringify(response.body));
            // ✅ Assert response body
        //cy.expect(response.body).to.have.property('id')
        });
    });

    it('200 - GET Specific User', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/', // Pet Store API
            failOnStatusCode: false,
        }).then((response) => {
            // ✅ Assert status
            expect(response.status).to.eq(200);

            // ✅ Assert response headers
            //expect(response.headers['content-type']).to.include('application/json');
            cy.log(JSON.stringify(response.body));
            // ✅ Assert response body
            //cy.expect(response.body).to.have.property('id')
        });
    });
}); 