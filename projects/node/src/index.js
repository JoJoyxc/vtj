// import * as VtjBase from '@vtj/base';
const { RSA, unRSA } = require('@vtj/base');

const code = RSA('abc');

console.log(code, unRSA(code));
