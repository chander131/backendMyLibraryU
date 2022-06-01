const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos.middleware');

const routerAuth = Router();

const { login, refreshAccessToken } = require('../controllers/auth.controller');

routerAuth.post('/login', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos,
], login);
routerAuth.post('/refresh-access-token', [
  check('refreshToken', 'El refreshToken es necesario').not().isEmpty(),
  validarCampos,
], refreshAccessToken);

module.exports = routerAuth;
