function publicFn() {
  return privateFn() + 4;
}

function privateFn() {
  return Math.random().toFixed(1) * 10;
}

module.exports = {
  publicFn,
};
