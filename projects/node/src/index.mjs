import { upperFirstCamelCase, RSA, md5 } from '@vtj/base';

const pk =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlbTnBBDGv5WUxARTFdhjIouE+95yucvtnLAlByZQtYoa0cr90Amt4vw+W84hskoMUgp9guiaOBmEqPz30MFm7EfZNG7IeH/iriPIcv/IF5nApoTp7wufMn5cpmSdhLXauBaXx+VJUUm2psnaEdlMlQk2qHqVbKD0PHoygU6A6pwIDAQAB';

// const value = slice([1, 2, 3, 4], 1, 2);

console.log(upperFirstCamelCase('hello-world'));

console.log('md5', md5('abc'));

const key = '123';
const res = RSA(pk, 'abc');
console.log('RSA', res);

// console.log(upperFirst('hello'));
