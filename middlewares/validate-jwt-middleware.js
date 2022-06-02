const { request, response } = require('express');
const jwt = require('jwt-simple');
const moment = require('moment');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    let token = req.headers.authorization;

    if (!token) return res.status(401).json({ ReturnCode: 401, ReturnMsg: 'La peticion no tiene cabecera de Autenticacion.' });

    try {
        token = token.replace(/['"]+/g, "");
        
        let payload = jwt.decode(token, 'bknJA8yUnn39kalxMZa90Hsu1mznXCNns793');

        if (payload.exp <= moment().unix()) return res.status(404).send({ ReturnCode: 401, ReturnMsg: 'El token a expirado.' });
        
        const userAuth = await User.findById(payload.uid);

        if (!userAuth || !userAuth.active) {
            return res.status(401).json({ ReturnCode: 401, ReturnMsg: 'Sin autorización' });
        }

        req.uid = payload.uid;
        req.user = payload;
        return next();
    } catch (err) {
        console.log("🚀 ~ file: validate-jwt-middleware.js ~ line 33 ~ validateJWT ~ err", err);
        return res.status(401).send({ ReturnCode: 401, ReturnMsg: 'Token invalido.' });
    }
}

module.exports = {
    validateJWT,
};
