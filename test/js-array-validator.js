const joi = require("@hapi/joi");

describe("joi array typed validator", () => {
  it.only("validate array with 2 rules", () => {
    const country = joi.object({
      name: joi.string().valid("country"),
      value: joi.array().items(joi.string().valid("jpn", "ua", "ru")),
    });

    const age = joi.object({
      name: joi.string().valid("age"),
      value: joi.array().items(joi.number().valid(22, 23, 24)),
    });

    const globSchema = joi
      .array()
      .items(joi.alternatives().try(country, age))
      .options({
        abortEarly: false,
      });

    const arr = [
      {
        name: "country1",
        value: ["jpn", "ru"],
      },

      {
        name: "age",
        value: [23, 54],
      },
    ];

    const res = globSchema.validate(arr);
  });
});
