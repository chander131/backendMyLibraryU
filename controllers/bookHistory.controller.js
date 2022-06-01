const { request, response } = require('express');
const moment = require('moment');
const { Types } = require('mongoose');
const { ObjectId } = Types;

const BookHistory = require('../models/bookHistory');
const Book = require('../models/book');
const StandarResponse = require('../models/StandarResponse');

const getAll = async (req = request, res = response) => {
  const response = new StandarResponse({});

  try {
    const bookHistory = await BookHistory.find().populate(['user', 'book']);

    response.ReturnData = bookHistory;
  } catch (e) {
    console.log("🚀 ~ file: bookHistory.controller.js ~ line 17 ~ getAll ~ e", e);
    response.ReturnCode = 500;
    response.ReturnMsg = e.message;
  }

  return res.status(response.ReturnCode).json(response);
};

const getByUser = async (req = request, res = response) => {
  const response = new StandarResponse({});

  try {
    const { id } = req.params;
    const booksHistory = await BookHistory.find({ user: id }).populate(['user', 'book']);

    response.ReturnData = booksHistory;
  } catch (e) {
    console.log("🚀 ~ file: bookHistory.controller.js ~ line 34 ~ getByUser ~ e", e);
    response.ReturnCode = 500;
    response.ReturnMsg = e.message;
  }

  return res.status(response.ReturnCode).json(response);
};

const update = async (req = request, res = response) => {
  const response = new StandarResponse({});

  try {
    const { id } = req.params;
    const {
      status,
    } = req.body;
    let bookSumeStock;

    const bookHistory = await BookHistory.findOneAndUpdate({ _id: id }, { status, deliverDate: moment().unix() }, { new: true });

    if (status === 'DELIVERED') {
      const book = await Book.findById(bookHistory.book);
      bookSumeStock = await Book.findByIdAndUpdate(bookHistory.book, { stock: book.stock + bookHistory.stock });
    }


    response.ReturnMsg = 'BookHistory updated successfully';
    response.ReturnData = {
      bookSumeStock,
      bookHistory
    };
  } catch (e) {
    console.log("🚀 ~ file: book.controller.js ~ line 84 ~ update ~ e", e);
    response.ReturnCode = 500;
    response.ReturnMsg = e.message;
  }

  return res.status(response.ReturnCode).json(response);
};

module.exports = {
  getAll,
  getByUser,
  update,
};
