const { Schema, model } = require('mongoose');

/**
 * @class BookSchema
 * @property {String} title
 * @property {String} author  
 * @property {Number} publishedYear  
 * @property {String} gender
 * @property {Number} stock
 */
const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  author: {
    type: String,
    required: [true, 'Author is requerid']
  },
  publishedYear: {
    type: Number,
    required: [true, 'Published year is required']
  },
  gender: {
    type: String,
    required: [true, 'Gender ir required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required']
  },
});

BookSchema.methods.toJSON = function () {
  const { __v, ...book } = this.toObject();
  return { ...book };
};

module.exports = model('Book', BookSchema, 'Books');
