const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

/**
 * @class BookHistorySchema
 * @property {String} gender
 */
const BookHistorySchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  book: {
    type: Types.ObjectId,
    ref: 'Book',
    required: [true, 'Book is required']
  },
  departureDate: {
    type: Number,
    default: moment().unix(),
    required: [true, 'DepartureDate is required']
  },
  deliverDate: {
    type: Number,
    default: moment().unix(),
    required: [true, 'DeliverDate is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required']
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    default: 'EARRING',
    enum: ['EARRING', 'DELIVERED']
  }
});

BookHistorySchema.methods.toJSON = function () {
  const { __v, ...bookHistory } = this.toObject();
  return { ...bookHistory };
};

module.exports = model('BookHistory', BookHistorySchema, 'BooksHistory');
