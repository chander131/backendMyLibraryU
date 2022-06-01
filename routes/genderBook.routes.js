const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const { existGenderBook } = require('../helpers/db-validators');

const {
  getAll,
  create,
} = require('../controllers/genderBook.controller');

const router = Router();

router.get('/', getAll);
router.post('/', [
  check('gender', 'El genero es obligatorio').notEmpty(),
  check('gender').custom(existGenderBook),
  validarCampos,
], create);

module.exports = router;
