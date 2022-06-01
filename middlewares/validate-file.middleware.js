const { request, response } = require("express");
const StandarResponse = require('../models/StandarResponse');

const hasFiles = async (req = request, res = response, next) => {
    const files = req.files;
    if (!files || Object.keys(files).length === 0 || !files?.file) {
        const response = new StandarResponse({
            ReturnCode: 400,
            ReturnMsg: 'Errors inputs, no hay archivos para subir',
            ReturnData: errors
        });
        return res.status(response.ReturnCode).json(response);
    }
    next();
};

module.exports = {
    hasFiles,
};
