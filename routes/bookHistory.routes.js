const { Router } = require('express');
const { check } = require('express-validator');

const {
  validarCampos,
} = require('../middlewares');

const {
  getAll,
  getByUser,
  update,
} = require('../controllers/bookHistory.controller');

const router = Router();

router.get('/', getAll);
router.get('/:id', getByUser);
router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('status', 'No es un estado valido').isIn(['EARRING', 'DELIVERED']) ,
  validarCampos,
], update);

module.exports = router;
