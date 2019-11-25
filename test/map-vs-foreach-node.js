const faker = require("faker");
const NS_PER_SEC = 1e9;

let data = [];
const dataLength = 10000;

describe("map vs forEach performance comparing", () => {
  beforeEach(() => {
    for (let i = 0; i < dataLength; i++) {
      data[i] = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        findName: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        prefix: faker.name.prefix(),
        suffix: faker.name.suffix(),
        title: faker.name.title(),
        jobDescriptor: faker.name.jobDescriptor(),
        jobArea: faker.name.jobArea(),
        jobType: faker.name.jobType()
      };
    }
  });

  afterEach(() => {
    data = [];
  });

  it("map", () => {
    const time = process.hrtime();
    const resArray = data.map(item => ({
      ...item,
      str: `${item.prefix}-${item.firstName}-${item.lastName}`
    }));
    const diff = process.hrtime(time);
    const secondsDiff = (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC;
    console.log(`Benchmark for map took ${secondsDiff} seconds`);
  });

  it("forEach", () => {
    const time = process.hrtime();
    const resArray = data.forEach(
      item => (item.str = `${item.prefix}-${item.firstName}-${item.lastName}`)
    );
    console.log(data[0])
    const diff = process.hrtime(time);
    const secondsDiff = (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC;
    console.log(`Benchmark for forEach took ${secondsDiff} seconds`);
  });
});
