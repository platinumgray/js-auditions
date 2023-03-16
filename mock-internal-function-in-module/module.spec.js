const { publicFn } = require("./module");

// * Check if jest.mock will overwrite private function in module

jest.mock("./module.js", () => {
  const originalModule = jest.requireActual("./module.js");
  return {
    ...originalModule,
    privateFn: () => 1,
  };
});

describe("Private function mocking in module", () => {
  it("check", () => {
    const result = publicFn();
    // * No
    console.log("🚀 ~ file: module.spec.js:6 ~ it ~ result", result);
  });
});
