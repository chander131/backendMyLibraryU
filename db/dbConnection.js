const mongoose = require('mongoose');
const AppConfig = require('../config/AppConfig');

const dbConnection = async () => {
    try {
        await mongoose.connect(AppConfig.uriDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Conexion a la base de datos en linea');
    } catch (e) {
        console.log("🚀 ~ file: dbConnection.js ~ line 12 ~ dbConnection ~ e", e)
        throw new Error('Error en la conexion de base de datos');
    }
};

module.exports = dbConnection;
