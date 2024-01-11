async function init() {
  console.log('Hello, world!');
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
