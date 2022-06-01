const chai = require('chai')
const expect = chai.expect

const { ChangeKeysObject } = require('../functions/objectsDataProcess');

const user = {
    name: 'Daniel',
    age: 21,
    email: 'daniel21@gmail.com'
};

const oldKeys = ['name', 'age', 'email'];
const newKeys = ['nombre', 'edad', 'correo'];

const result = {
    nombre: 'Daniel',
    edad: 21,
    correo: 'daniel21@gmail.com'
};
const resultWithOldKey = {
    ...user,
    ...result,
};

describe("Funtions", () => {
    describe("functions/objectsDataProccess", () => {
        it("ChangeKeysObject test ->", () => {
            expect(ChangeKeysObject(oldKeys, newKeys, user)).to.eql(result);
        });
        it("ChangeKeysObject test ->", () => {
            expect(ChangeKeysObject(oldKeys, newKeys, user, true)).to.eql(resultWithOldKey);
        });
    });
});
