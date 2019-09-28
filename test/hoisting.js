const expect = require("chai").expect;

describe("hoisting", () => {
  it("using var variable before initialize", () => {
    console.log(x);
    expect(x).to.be.eq(undefined);
    var x = 1;
  });

  it("using function before announcement", done => {
    hello();
    function hello() {
      console.log("hello fn used");
      done();
    }
  });

  it("using const arrow function before announcement", done => {
    try {
      //const don't hoist
      fn();
      const fn = () => console.log("foo");
    } catch (error) {
      done();
    }
  });

  it("using var arrow function before announcement", done => {
    try {
      //don't hoist in this situation neither
      fn();
      var fn = () => console.log("foo");
    } catch (error) {
      done();
    }
  });

  it("hoisting in for with var", () => {
    const arr = [1, 2, 3, 4];
    for (var i = 0; i < 3; i++) {}

    expect(arr[i]).to.equal(4);
  });
});
