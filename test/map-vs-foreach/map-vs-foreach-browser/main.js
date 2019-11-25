(function() {
  let data = [];
  const dataLength = 10000;

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

  (function() {
    const time = window.performance.now();
    const resArray = data.map(item => ({
      ...item,
      str: `${item.prefix}-${item.firstName}-${item.lastName}`
    }));
    const diff = window.performance.now();
    const secondsDiff = diff - time;
    console.log(`Benchmark for map took ${secondsDiff} seconds`);
  })();

  (function() {
    const time = window.performance.now();
    const resArray = data.forEach(
      item => (item.str = `${item.prefix}-${item.firstName}-${item.lastName}`)
    );
    const diff = window.performance.now();
    const secondsDiff = diff - time;
    console.log(`Benchmark for forEach took ${secondsDiff} seconds`);
  })();
})();
