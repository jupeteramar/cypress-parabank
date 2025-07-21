import { faker } from '@faker-js/faker';

export function automationExerciseTestData() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const middleInitial = faker.person.middleName();
    const emailAddress = `${firstName}.${lastName}@test.com`.toLowerCase();
    const title = faker.helpers.arrayElement(['Mr', 'Mrs']);
    const titleWithPeriod = `${title}.`;
    const company = `${faker.company.name()} Inc.`;
    const address = faker.location.streetAddress();
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const mobileNumber = faker.phone.number();
    const ssn = faker.phone.number();
    const password = 'Password';

    return {
        firstName,
        lastName,
        emailAddress,
        signUpName: `${firstName}${middleInitial}${lastName}`,
        signUpEmailAddress: emailAddress,
        titleWithPeriod,
        company,
        address,
        state,
        city,
        zipCode,
        mobileNumber,
        ssn,
        password
    }
}