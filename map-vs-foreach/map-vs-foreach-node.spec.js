const { faker } = require("@faker-js/faker");
const NS_PER_SEC = 1e9;

let data = [];
const dataLength = 10000;

describe("map vs forEach performance comparing", () => {
  beforeEach(() => {
    for (let i = 0; i < dataLength; i++) {
      data[i] = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };
    }
  });

  afterEach(() => {
    data = [];
  });

  it("map", () => {
    const time = process.hrtime();
    const resArray = data.map((item) => ({
      ...item,
      str: `${item.prefix}-${item.firstName}-${item.lastName}`,
    }));
    const diff = process.hrtime(time);
    const secondsDiff = (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC;
    console.log(`Benchmark for map took ${secondsDiff} seconds`);
  });

  it("forEach", () => {
    const time = process.hrtime();
    const resArray = data.forEach(
      (item) => (item.str = `${item.prefix}-${item.firstName}-${item.lastName}`)
    );
    const diff = process.hrtime(time);
    const secondsDiff = (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC;
    console.log(`Benchmark for forEach took ${secondsDiff} seconds`);
  });
});
