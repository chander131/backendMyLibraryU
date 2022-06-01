const { request, response } = require('express');
const GenderBook = require('../models/genderBook');
const StandarResponse = require('../models/StandarResponse');

const getAll = async (req = request, res = response) => {
  const response = new StandarResponse({});

  try {
    const genders = await GenderBook.find();

    response.ReturnData = genders;
  } catch (e) {
    console.log("🚀 ~ file: genderBook.controller.js ~ line 13 ~ getAll ~ e", e);
    response.ReturnCode = 500;
    response.ReturnMsg = e.message;
  }

  return res.status(response.ReturnCode).json(response);
};

const create = async (req = request, res = response) => {
  const response = new StandarResponse({});

  try {
    const { gender } = req.body;
    const genderBook = new GenderBook({ gender });
    await genderBook.save()

    response.ReturnData = genderBook;
  } catch (e) {
    console.log("🚀 ~ file: genderBook.controller.js ~ line 31 ~ create ~ e", e);
    response.ReturnCode = 500;
    response.ReturnMsg = e.message;
  }

  return res.status(response.ReturnCode).json(response);
};

module.exports = {
  getAll,
  create,
};
