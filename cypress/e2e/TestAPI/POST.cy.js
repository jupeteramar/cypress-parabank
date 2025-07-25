/// <reference types='Cypress' />

import '../../support/ParaBankCommands/cmdParaBank';

describe('POST Requests', () => {

   it('200 - Successful Adding of Pet', () => {
      cy.request({
         method: 'POST',
         url: 'https://petstore.swagger.io/v2/store/order', // Pet Store API Place and Order
         body: {
            id: 50,
            category: {
               id: 50,
               name: "string"
            },
            name: "Pluto",
            photoUrls: [
               "string"
            ],
            tags: [
               {
                  id: 0,
                  name: "string"
               }
            ],
            status: "available"
         },
         failOnStatusCode: false
      }).then((response) => {
         expect(response.body).to.have.property('id');
         //expect(response.body).to.have.property('name', "Pluto");
         // expect(response.body).to.have.property('photoUrls');
         // expect(response.body).to.have.property('tags');
         // expect(response.body).to.have.property('status');
         cy.log(JSON.stringify(response.body));
      })
   })

   it('200 - Successful Adding of Order', () => {
      cy.request({
         method: 'POST',
         url: 'https://petstore.swagger.io/v2/store/order', // Pet Store API Place and Order
         body: {
            id: 1,
            petId: 2,
            quantity: 223,
            shipDate: "2025-07-24T02:13:37.080Z",
            status: "placed",
            complete: true
         },
         failOnStatusCode: false
      }).then((response) => {
         expect(response.body).to.have.property('id', 1);
         expect(response.body).to.have.property('petId', 2);
         expect(response.body).to.have.property('quantity', 223);
         expect(response.body).to.have.property('shipDate', "2025-07-24T02:13:37.080+0000");
         expect(response.body).to.have.property('status', "placed");
         expect(response.body).to.have.property('complete', true);
         cy.log(JSON.stringify(response.body));
      })
   })

   it('500 - Unsuccessful Adding of Order', () => {
      cy.request({
         method: 'POST',
         url: 'https://petstore.swagger.io/v2/store/order', // Pet Store API
         body: {
            id: 215,
            petId: 215,
            quantity: 2215314151,
            shipDate: "2025-07-24T02:13:37.080Z",
            status: "placed",
            complete: true
         },
         failOnStatusCode: false
      }).then((response) => {
         // ✅ Assert status
         expect(response.status).to.eq(500);
         cy.log(JSON.stringify(response.body));
      });
   });

   it('400 - Unsuccessful Updating of Pet Data', () => {
      cy.request({
         method: 'POST',
         url: 'https://petstore.swagger.io/v2/store/order/[%7B%25%7D]', // Pet Store API
         body: {
            petId: 9,
            name: "Scooby",
            status: "sold",
         },
         failOnStatusCode: false
      }).then((response) => {
         // ✅ Assert status
         expect(response.status).to.eq(400);
         cy.log(JSON.stringify(response.body));
      });
   });

   it('200 - POST Add New User with List', () => {
      cy.request({
         method: 'POST',
         url: 'https://petstore.swagger.io/v2/user/createWithList',
         body: [
            {
               "id": 51,
               "username": "johnsnow",
               "firstName": "John",
               "lastName": "Snow",
               "email": "winter@iscoming",
               "password": "khaleesi",
               "phone": "753",
               "userStatus": 0
            }
         ],
         failOnStatusCode: false
      }).then((response) => {
         // ✅ Assert status
         expect(response.status).to.eq(200);

         // ✅ Assert response headers
         expect(response.headers['content-type']).to.include('application/json');

         // ✅ Assert response body
         cy.log(JSON.stringify(response.body))

      })
   })


   it('200 - POST Add New User', () => {
      cy.request({
         method: 'POST',
         url: 'https://petstore.swagger.io/v2/user', // Pet Store API
         body: {
            "id": 500,
            "username": "musiquean",
            "firstName": "Johann",
            "lastName": "Bach",
            "email": "jsbach@baroque.ge",
            "password": "bwvmotet",
            "phone": "321",
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

      });
   });

}); 