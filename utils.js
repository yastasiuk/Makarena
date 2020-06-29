
async function wait(seconds) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, seconds * 1000);
  });
}

module.exports = {
  wait,
};
