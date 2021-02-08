
describe("Promises", () => {
  describe("handle errors from promises", () => {
    it("handle error in new Promise with trycatch", done => {
      try {
        const prom = new Promise((res, rej) => {
          setTimeout(5, rej(new Error("something")));
        });

        prom.catch(() => {
          done();
        });
      } catch (error) {
        done(new Error("Catched from new Promise with trycatch"));
      }
    });

    it("handle error in Promise.resolve() with trycatch", done => {
      let prom = null;
      try {
        prom = Promise.resolve().then(() => {
          throw new Error("Some error from promise");
        });
      } catch (error) {
        done(new Error("Catched from new Promise with trycatch"));
      }

      prom.catch(() => {
        done();
      });
    });

    it("handle error in async function in trycatch", async () => {
      async function fn() {
        throw new Error("Some error from async function ");
      }

      try {
        await fn();
      } catch (error) {
        expect(error).not.toBe(null);
      }
    });

    it("handle error in async function in catch", async () => {
      async function fn() {
        throw new Error("Some error from async function ");
      }

      try {
        fn().catch(error => {
          console.log("promise.catch worked");
          expect(error).not.toBe(null);
        });
      } catch (error) {
        expect(error).not.toBe(null);
      }
    });
  });

  describe("handle errors in promise.all", () => {
    it("Promise.all catch error from different Promises,error in new Promise", async () => {
      const prom1 = new Promise((res, rej) => {
        setTimeout(() => {
          rej(new Error("Error from new Promise"));
        }, 1000);
      });

      const prom2 = Promise.resolve().then(() => {
        for (let i = 0; i < 100; i++) {}
        console.log("Promise.resolve() completed");

        return 0;
      });

      const prom3 = async () => {
        for (let i = 0; i < 150; i++) {}
        console.log("async completed");
        return 0;
      };

      async function prom4() {
        for (let i = 0; i < 200; i++) {}
        console.log("async completed");
        return 0;
      }

      try {
        const res = await Promise.all([prom1, prom2, prom3(), prom4()]);
      } catch (error) {
        console.log("catched with error");
        console.log(error);
      }
    });

    it("Promise.all catch error from different Promises,error in new Promise, in middle of execution", async () => {
      async function delay(delayInt) {
        for (let index = 0; index < delayInt; index++) {}
        console.log(`${delayInt} finished`);
        return 0;
      }
      async function errorDelay(delayInt) {
        for (let index = 0; index < delayInt; index++) {}
        throw new Error(`${delayInt} error`);
      }
      try {
        const res = await Promise.all([
          delay(100),
          errorDelay(150),
          delay(200),
          delay(250)
        ]);
        console.log("TCL: res", res);
      } catch (error) {
        console.log("catched with error");
        console.log(error);
      }
    });

    it("Promise.all work with asyncs", async () => {
      const arr = [1, 2, 3, 4, 5];
      async function delay(param) {
        for (let i = 0; i < 150; i++) {}
        return param;
      }
      const res = await Promise.all(arr.map(e => delay(e)));
      console.log(res);
    });
  });
});
