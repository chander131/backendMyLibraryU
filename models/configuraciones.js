const { Schema, model } = require('mongoose');
const { Schema } = mongoose;

/**
 * @class FormatosNotificacionesSchema
 * @property {String} _id
 * @property {String} aplicacion  
 * @property {String} Nombre  
 * @property {String} Parametrizacion
 * @property {String} usuarioCreo
 * @property {String} fechaCreacion
 * @property {String} usuarioModifica
 * @property {String} fechaModificacion
 */
const ConfiguracionesSchema = new Schema({
    _id: { type: String, required: true },
    aplicacion: { type: String, required: true },
    Nombre: { type: String, required: true },
    Parametrizacion: { type: Object, required: false },
    usuarioCreo: { type: String, required: true },
    fechaCreacion: { type: String, required: true },
    usuarioModifica: { type: String, required: true },
    fechaModificacion: { type: String, required: true },
});

module.exports = model('Configuraciones', ConfiguracionesSchema, 'Configuraciones');