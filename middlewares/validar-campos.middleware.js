const { validationResult } = require('express-validator');
const StandarResponse = require('../models/StandarResponse');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const response = new StandarResponse({
            ReturnCode: 400,
            ReturnMsg: 'Errors inputs',
            ReturnData: errors
        });
        return res.status(response.ReturnCode).json(response);
    }
    next();
};

module.exports = {
    validarCampos,
};
