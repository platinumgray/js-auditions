
describe("Test tasks", () => {
  describe("Compare JSON", () => {
    const compareJSON = (x, y) => {
      try {
        x = JSON.parse(x);
        y = JSON.parse(y);
      } catch (error) {}
      const ok = Object.keys,
        tx = typeof x,
        ty = typeof y;
      return x && y && tx === "object" && tx === ty
        ? ok(x).length === ok(y).length &&
            ok(x).every(key => compareJSON(x[key], y[key]))
        : x === y;
    };
    it("Compare JSON true", () => {
      const json1 =
        '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';
      const json2 =
        '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';

      const result = compareJSON(json1, json2);
      expect(result).toBe(true);
    });
    it("Compare JSON false", () => {
      const json1 =
        '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';
      const json2 =
        '{"glossary":{"title":"example_1 glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';

      const result = compareJSON(json1, json2);
      expect(result).toBe(false);
    });
  });

  describe("Statictic data slice", () => {
    class RequestsSlicer {
      constructor() {
        this.memory = new Map();
      }
      requestHandler(rq) {
        if (this.memory.has(rq.source)) {
          this.memory.get(rq.source).push(rq);
        } else {
          this.memory.set(rq.source, []);
          this.memory.get(rq.source).push(rq);
        }
      }
      topFreqSources() {
        const statiscticData = [];
        for (const i of this.memory.keys()) {
          statiscticData.push({ source: i, length: this.memory.get(i).length });
        }
        statiscticData.sort(function(i, j) {
          if (i.length > j.length) return -1;
          if (i.length < j.length) return 1;
          return 0;
        });

        return statiscticData.slice(0, 10);
      }
    }
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    it("data slice", () => {
      const slicer = new RequestsSlicer();

      const sources = [];

      for (let i = 1; i < 100; i++) {
        sources.push(`source${i}`);
      }

      for (let i = 0; i < 1000000; i++) {
        getRandomInt(sources.length);
        slicer.requestHandler({
          source: sources[getRandomInt(sources.length)],
          sourceData: getRandomInt(Number.MAX_SAFE_INTEGER)
        });
      }

      console.log("top 10 results");
      console.log(slicer.topFreqSources());
    });
  });
});
