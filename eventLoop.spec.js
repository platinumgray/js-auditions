const EventEmitter = require("events");

describe("event loop", () => {
  it("event loop order", done => {
    process.nextTick(() => console.log("next tick")); //1

    setImmediate(() => {
      console.log("setImmediate"); //4

      setTimeout(() => {
        console.log("Immediate setTimeout");
        done();
      }, 0); //6

      setImmediate(() => console.log("Immediate setImmediate")); //5
    });
    setTimeout(() => console.log("setTimeout"), 0); //3

    Promise.resolve().then(() => console.log("Promise")); //2
  });

  it("process.nextTick async initialization", done => {
    class world extends EventEmitter {
      constructor() {
        super();
        process.nextTick(() => {
          this.emit("hello");
        });
      }
    }

    const x = new world();
    x.on("hello", () => {
      console.log("hello event fired");
      done();
    });
  });
});
