const { faker } = require("@faker-js/faker");
const benchmarkFn = (cb, label = "") => {
  console.log(`${label} started`)
  const NS_PER_SEC = 1e9;
  const time = process.hrtime();
  const res = cb();
  const diff = process.hrtime(time);
  const secondsDiff = (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC;
  console.log(`Benchmark for ${label} took ${secondsDiff} seconds`);
  return res;
};

const generateData = (count = 1000) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: "id" + i,
    });
  }
  return data;
};

describe("Map vs Direct assign speed comparsion", () => {
  const data = generateData(100000);
  const m = new Map();
  const obj = {};

  it("map set", () => {
    benchmarkFn(() => {
      data.forEach((x) => {
        m.set(x.id, x);
      });
    }, "Map insertion");
  });

  it("map get", () => {
    benchmarkFn(() => {
      data.forEach((x) => {
        m.get(x.id);
      });
    }, "Map get");
  });

  it("direct assign", () => {
    benchmarkFn(() => {
      data.forEach((x) => {
        obj[x.id] = x;
      });
    }, "direct assign");
  });

  it("direct assign", () => {
    benchmarkFn(() => {
      data.forEach((x) => {
        let i = obj[x.id];
      });
    }, "direct get");
  });
});
