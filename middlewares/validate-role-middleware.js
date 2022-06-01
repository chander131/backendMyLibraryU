const { request, response } = require('express');
const { ALLOWEDROLES } = require('../config/constants');

const validateRole = async (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            ReturnCode: 500, ReturnMsg: 'No existe información del rol en la petición'
        });
    }

    const { role, name } = req.user;

    if (!ALLOWEDROLES.includes(role)) {
        return res.status(401).json({ ReturnCode: 401, ReturnMsg: `Usuario ${name}: no posee permisos para ejecutar esta acción` });
    }

    next();
};

const hasRole = (...roles) => async (req = request, res = response, next) => {
    const { user } = req;
    if (!user) {
        return res.status(500).json({
            ReturnCode: 500, ReturnMsg: 'No existe información del rol en la petición'
        });
    }

    if (!roles.includes(user.role)) {
        return res.status(401).json({ ReturnCode: 401, ReturnMsg: `Usuario ${user.name}: no posee permisos para ejecutar esta acción` });
    }

    next();
};

module.exports = {
    validateRole,
    hasRole,
};
