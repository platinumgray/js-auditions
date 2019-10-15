const expect = require("chai").expect;

describe("hoisting", () => {
  it("using var variable before initialize", () => {
    console.log(x);
    var x = 1;
  });

  it("using function before announcement", () => {
    hello();
    function hello() {
      console.log("world");
    }
  });

  it("using const arrow function before announcement", done => {
    //const dont hoist
    try {
      fn();
      const fn = () => console.log("foo");
    } catch (error) {
      done();
    }
  });

  it("using var arrow function before announcement", done => {
    try {
      //dont hoist in this situation neither
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

  it("weird hoisting task", () => {
    var a = 1;
    function f() {
      console.log("inside fn", a);
      var a = 5;
    }
    console.log("outside fn", a);

    f();
  });
});
