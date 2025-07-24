/// <reference types='Cypress' />


describe('PUT  Requests', () => {
    it('200 - PUT Update User Data', () => {
        cy.request({
            method: 'GET',
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
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('username');
            expect(response.body).to.have.property('firstName');
            expect(response.body).to.have.property('lastName');
            expect(response.body).to.have.property('email');
            expect(response.body).to.have.property('password');
            expect(response.body).to.have.property('phone');
            expect(response.body).to.have.property('userStatus');
        });
    });
});