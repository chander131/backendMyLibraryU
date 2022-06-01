const { Schema, model } = require('mongoose');

const UserScheme = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastname: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatoria'],
    },
    role: {
        type: String,
        required: true,
        default: 'STUDENT_ROLE',
        enum: ['LIBRARIAN_ROLE', 'STUDENT_ROLE']
    },
    active: {
        type: Boolean,
        default: true,
    },
});

UserScheme.methods.toJSON = function () {
    const { __v, password, _id: uid, ...user } = this.toObject();
    return { ...user, uid };
};

module.exports = model('User', UserScheme, 'Users');
