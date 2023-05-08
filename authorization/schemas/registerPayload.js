const { roles } = require('../../config');

module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    email: {
      type: 'string',
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
    },
    password: {
      type: 'string'
    },
    age: {
      type: 'number'
    },
    role: {
      type: 'string',
      enum: Object.values(roles)
    }
  },
  required: [
    'username',
    'email',
    'password',
    'age'
  ],
  additionalProperties: false
};
