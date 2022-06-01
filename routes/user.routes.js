const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validateJWT,
    validateRole,
    hasRole,
} = require('../middlewares');

const { esRolValido, validarEmail, existUserById } = require('../helpers/db-validators');
const { LIBRARIAN_ROLE, STUDENT_ROLE } = require('../config/constants');

const {
    usersGet,
    userGet,
    userPost,
    userPut,
    userDelete,
    activateUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', usersGet);
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos,
], userGet);
router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('lastname', 'El apellido es obligatorio').notEmpty(),
    check('email', 'El correo no es valido').notEmpty().isEmail(),
    check('email').custom(validarEmail),
    check('password', 'La contraseña debe de tener mínimo 6 caracteres y máximo 15').isLength({ min: 6, max: 15 }),
    check('role').custom(esRolValido),
    validarCampos,
], userPost);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(esRolValido),
    validarCampos,
], userPut);
router.delete('/:id', [
    validateJWT,
    hasRole(LIBRARIAN_ROLE),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos,
], userDelete);
router.post('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('active', 'No es un valor valido').isBoolean(),
    validarCampos,
], activateUser);

module.exports = router;
