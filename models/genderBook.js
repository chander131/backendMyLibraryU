const { Schema, model } = require('mongoose');

/**
 * @class GenderBookSchema
 * @property {String} gender
 */
const GenderBookSchema = new Schema({
  gender: {
    type: String,
    required: [true, 'Gender is required']
  },
});

GenderBookSchema.methods.toJSON = function () {
  const { __v, ...genderBook } = this.toObject();
  return { ...genderBook };
};

module.exports = model('GenderBook', GenderBookSchema, 'GendersBooks');
