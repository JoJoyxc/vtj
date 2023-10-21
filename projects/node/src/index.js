const { md5 } = require('@vtj/base');

(async () => {
  const value = await md5('ABc');
  console.log(value);
})();
