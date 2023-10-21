// import MD5 from 'crypto-js/md5';
// import JSEncrypt from 'jsencrypt';

export async function md5(content: string) {
  const MD5 = (await import('crypto-js/md5')).default;
  return String(MD5(content));
}

// export function RSA(key: string, content: string) {
//   const crypt = new JSEncrypt();
//   crypt.setKey(key);
//   return crypt.encrypt(content);
// }
