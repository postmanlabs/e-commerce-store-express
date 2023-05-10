const { productPriceUnits } = require("../../config");
module.exports = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    image: {
      type: "string",
    },
    price: {
      type: "number",
    },
    priceUnit: {
      type: "string",
      enum: Object.values(productPriceUnits),
    },
  },
  required: ["name", "description", "image", "price"],
  additionalProperties: false,
};
