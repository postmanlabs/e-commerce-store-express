const { roles } = require('../../config');

module.exports = {
  type: 'object',
  properties: {
    age: {
      type: 'number'
    },
    role: {
      type: 'string',
      enum: Object.values(roles)
    }
  },
  additionalProperties: false
};
