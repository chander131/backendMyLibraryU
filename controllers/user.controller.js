/**
 * @module UserController
 */

const { request, response } = require('express');
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');
const StandarResponse = require('../models/StandarResponse');

const usersGet = async (req = request, res = response) => {
    const response = new StandarResponse({});
    let { limit = 10, pagina = 1, orderby = 'asc' } = req.query;
    const filter = { active: true };

    try {
        let limite = isNaN(Number(limit)) ? 10 : Number(limit);
        let page = isNaN(Number(pagina)) ? 1 : Number(pagina);
        let desde = (page - 1) * limite;
        orderby = orderby.toLowerCase() === 'desc' ? -1 : +1;

        const [users, total] = await Promise.all([
            User.find(filter).skip(desde).limit(limite).sort({ _id: orderby }),
            User.countDocuments(filter)
        ]);

        response.ReturnData = { users, total };
    } catch (e) {
        console.log('ERROR user.controller => usersGet', e);
        response.ReturnCode = 500;
        response.ReturnMsg = e.message;
    }

    return res.status(response.ReturnCode).json(response);
};

const userGet = async (req = request, res = response) => {
    const response = new StandarResponse({});

    try {
        const { id } = req.params;

        const user = await User.findById(id);

        response.ReturnData = user;
    } catch (e) {
        console.log('ERROR in user.controller => userGet', e.message);
        response.ReturnCode = 500;
        response.ReturnMsg = e.message;
    }

    return res.status(response.ReturnCode).json(response);
};

const userPost = async (req = request, res = response) => {
    const response = new StandarResponse({});

    try {
        const {
            name,
            lastname,
            email,
            password,
            role,
        } = req.body;
        const user = new User({
            name,
            lastname,
            email,
            password,
            role,
        });

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        await user.save();

        response.ReturnCode = 201;
        response.ReturnMsg = 'Usuario creado con éxito';
        response.ReturnData = user;
    } catch (e) {
        console.log("🚀 ~ file: user.controller.js ~ line 44 ~ userPost ~ e", e);
        response.ReturnCode = 500;
        response.ReturnMsg = e.message;
    }

    return res.status(response.ReturnCode).json(response);
};

const userPut = async (req = request, res = response) => {
    const response = new StandarResponse({});

    try {
        const { id } = req.params;
        const { _id, password, correo, ...rest } = req.body;

        if (password) {
            const salt = bcrypt.genSaltSync();
            rest.password = bcrypt.hashSync(password, salt);
        }

        const userStorage = await User.findOneAndUpdate({ _id: id }, rest, { new: true });

        response.ReturnMsg = 'Usuario actualizado con éxito';
        response.ReturnData = userStorage;
    } catch (e) {
        console.log("🚀 ~ file: user.controller.js ~ line 67 ~ userPut ~ e", e);
        response.ReturnCode = 500;
        response.ReturnMsg = e.message;
    }

    return res.status(response.ReturnCode).json(response);
};

const userDelete = async (req = request, res = response) => {
    const response = new StandarResponse({});

    try {
        const { id } = req.params;

        const userInactived = await User.findByIdAndUpdate(id, { estado: false }, { new: true });

        response.ReturnMsg = 'Usuario eliminado correctamente';
        response.ReturnData = userInactived;
    } catch (e) {
        console.log('ERROR in user.controller => userDelete', e.message);
        response.ReturnCode = 500;
        response.ReturnMsg = e.message;
    }

    return res.status(response.ReturnCode).json(response);
};

const activateUser = async (req = request, res = response) => {
    const response = new StandarResponse({});
    const { id } = req.params;
    const { active } = req.body;

    try {
        const data = await User.findByIdAndUpdate({ _id: id }, { active });
        
        if (!data) {
            response.ReturnCode = 404;
            response.ReturnMsg = 'No se a encontrado el usuario.';
        } else {
            response.ReturnMsg = active ? 'Usuario activado correctamente.' : 'Usuario desactivado correctamente.';
        }
    } catch (e) {
        console.log("🚀 ~ file: user.controller.js ~ line 166 ~ activateUser ~ e", e)
        response.ReturnCode = 500;
        response.ReturnMsg = e.message;
    }

    return res.status(response.ReturnCode).json(response);
}

module.exports = {
    usersGet,
    userGet,
    userPost,
    userPut,
    userDelete,
    activateUser,
};
