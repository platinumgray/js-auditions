const expect = require("chai").expect;

const Joi = require("@hapi/joi");
const globalSchema = Joi.object({
  checked: Joi.boolean(),
  dimensions: Joi.object({
    width: Joi.number()
      .min(0)
      .max(100),
    height: Joi.number()
      .min(0)
      .max(100)
  }),
  id: Joi.number(),
  name: Joi.string(),
  price: Joi.number(),
  tags: Joi.array().items(Joi.string())
});

describe.only("joi scaling", () => {
  it("global joi schema test success", () => {
    const initialExample = {
      checked: false,
      dimensions: {
        width: 5,
        height: 10
      },
      id: 1,
      name: "A green door",
      price: 12.5,
      tags: ["home", "green"]
    };
    const res = globalSchema.validate(initialExample);
    expect(res.value).deep.equal(initialExample);
  });
  it("global joi schema test fail", () => {
    const initialExample = {
      checked: false,
      dimensions: {
        width: 5,
        height: -100
      },
      id: 1,
      name: "A green door",
      price: 12.5,
      tags: ["home", "green"]
    };
    const res = globalSchema.validate(initialExample);
    expect(res.error.message).deep.equal(
      `"dimensions.height" must be larger than or equal to 0`
    );
  });

  it("joi scaling though keys", () => {
    const localSchema = globalSchema.keys({
      dimensions: Joi.object({
        width: Joi.number()
          .min(-1000)
          .max(100),
        height: Joi.number()
          .min(-1000)
          .max(100)
      })
    });
    const initialExample = {
      checked: false,
      dimensions: {
        width: -999,
        height: -100
      },
      id: 1,
      name: "A green door",
      price: 12.5,
      tags: ["home", "green"]
    };
    const res = localSchema.validate(initialExample);
    expect(res.value).deep.equal(initialExample);
  });
  it("joi scaling though alternatives", () => {
    const localSchema = Joi.object({
      _id: Joi.string(),
      index: Joi.number(),
      guid: Joi.string().guid(),
      isActive: Joi.boolean(),
      balance: Joi.string(),
      age: Joi.number(),
      eyeColor: Joi.string(),
      name: Joi.string()
    });

    const altSchema = Joi.alternatives().try(localSchema, globalSchema);

    const initialExample = {
      checked: false,
      dimensions: {
        width: 5,
        height: 10
      },
      id: 1,
      name: "A green door",
      price: 12.5,
      tags: ["home", "green"]
    };

    const alternativeExample = {
      _id: "5dd7d711fa5783cd0c28d874",
      index: 0,
      guid: "c8cf7ec5-4193-4c2a-8c39-ab9d19df2d0d",
      isActive: true,
      balance: "$3,321.59",
      age: 26,
      eyeColor: "blue",
      name: "Dale Gregory"
    };

    const localResult = altSchema.validate(alternativeExample);
    expect(localResult.value).deep.equal(alternativeExample)
    const globalResult = altSchema.validate(initialExample);
    expect(globalResult.value).deep.equal(initialExample)
  });
});
