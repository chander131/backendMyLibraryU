const { Router } = require('express');
const { check } = require('express-validator');

const {
  validarCampos,
} = require('../middlewares');

const { validateGenderBook, existBookById } = require('../helpers/db-validators');

const {
  getAll,
  getById,
  create,
  update,
  search,
  requestBook,
} = require('../controllers/book.controller');

const router = Router();

router.get('/', getAll);
router.get('/search', search);
router.get('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existBookById),
  validarCampos,
], getById);
router.get('/ask/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existBookById),
  validarCampos,
], requestBook);
router.post('/', [
  check('title', 'El titulo es obligatorio').notEmpty(),
  check('author', 'El autor es obligatorio').notEmpty(),
  check('publishedYear', 'El año de publicación no es valido').notEmpty().isInt(),
  check('gender').custom(validateGenderBook),
  check('stock', 'La cantidad disponible es invalida').isInt(),
  validarCampos,
], create);
router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existBookById),
  check('gender').custom(validateGenderBook).optional(),
  validarCampos,
], update);

module.exports = router;
