const { request, response } = require('express');
const moment = require('moment');
const { Types } = require('mongoose');
const { ObjectId } = Types;

const Book = require('../models/book');
const BookHistory = require('../models/bookHistory');
const StandarResponse = require('../models/StandarResponse');

const getAll = async (req = request, res = response) => {
  const response = new StandarResponse({});

  try {
    const books = await Book.find();

    response.ReturnData = books;
  } catch (e) {
    console.log("🚀 ~ file: book.controller.js ~ line 13 ~ getAll ~ e", e);
    response.ReturnCode = 500;
    response.ReturnMsg = e.message;
  }

  return res.status(response.ReturnCode).json(response);
};

const getById = async (req = request, res = response) => {
  const response = new StandarResponse({});

  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    response.ReturnData = book;
  } catch (e) {
    console.log("🚀 ~ file: book.controller.js ~ line 30 ~ getById ~ e", e);
    response.ReturnCode = 500;
    response.ReturnMsg = e.message;
  }

  return res.status(response.ReturnCode).json(response);
};

const create = async (req = request, res = response) => {
  const response = new StandarResponse({});

  try {
    const {
      title,
      author,
      publishedYear,
      gender,
      stock,
    } = req.body;

    const book = new Book({
      title,
      author,
      publishedYear,
      gender,
      stock,
    });
    await book.save();

    response.ReturnData = book;
  } catch (e) {
    console.log("🚀 ~ file: book.controller.js ~ line 44 ~ create ~ e", e);
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
      _id,
      ...rest
    } = req.body;

    const book = await Book.findOneAndUpdate({ _id: id }, rest, { new: true });

    response.ReturnMsg = 'Book updated successfully';
    response.ReturnData = book;
  } catch (e) {
    console.log("🚀 ~ file: book.controller.js ~ line 84 ~ update ~ e", e);
    response.ReturnCode = 500;
    response.ReturnMsg = e.message;
  }

  return res.status(response.ReturnCode).json(response);
};

const search = async (req = request, res = response) => {
  const response = new StandarResponse({});

  try {
    let { title, author, gender } = req.query;
    let filter = { };

    if (title) filter = { ...filter, title: new RegExp(`.*${title}.*`, 'i') };
    if (author) filter = { ...filter, author: new RegExp(`.*${author}.*`, 'i') };
    if (gender) filter = { ...filter, gender: new RegExp(`.*${gender}.*`, 'i') };
    
    const books = await Book.find(filter);

    response.ReturnData = books;
  } catch (e) {
    console.log("🚀 ~ file: book.controller.js ~ line 13 ~ getAll ~ e", e);
    response.ReturnCode = 500;
    response.ReturnMsg = e.message;
  }

  return res.status(response.ReturnCode).json(response);
};

const requestBook = async (req = request, res = response) => {
  const response = new StandarResponse({});

  try {
    let { id } = req.params;
    const uid = req.uid;

    const book = await Book.findById(id);
    const bookDeduceStock = await Book.findByIdAndUpdate(id, { stock: book.stock - 1 });
    
    const bookHistory = new BookHistory({
      user: new ObjectId(uid),
      book: new ObjectId(id),
      departureDate: moment().unix(),
      deliverDate: moment().unix(),
      stock: 1,
      status: 'EARRING',
    });

    await bookHistory.save();

    response.ReturnMsg = 'Se creo el historial correctamente';
    response.ReturnData = bookDeduceStock;
  } catch (e) {
    console.log("🚀 ~ file: book.controller.js ~ line 13 ~ getAll ~ e", e);
    response.ReturnCode = 500;
    response.ReturnMsg = e.message;
  }

  return res.status(response.ReturnCode).json(response);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  search,
  requestBook,
};
