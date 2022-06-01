const { request, response } = require('express');
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');
const StandarResponse = require('../models/StandarResponse');
const jwt = require('../services/jwt');

const willExpiredToken = (token) => {
	const { exp } = jwt.decodedToken(token);
	const currentDate = moment().unix();

	return currentDate > exp;
};

const login = async (req = request, res = response) => {
	const response = new StandarResponse({});
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			response.ReturnCode = 400;
			response.ReturnMsg = 'Usuario o contraseña incorrectos';
		}
		
		if (!user?.active) {
			response.ReturnCode = 400;
			response.ReturnMsg = 'Usuario inactivo';
		} else {
			const validPassword = bcrypt.compareSync(password, user.password);
	
			if (!validPassword) {
				response.ReturnCode = 400;
				response.ReturnMsg = 'Usuario o contraseña incorrectos';
			} else {
				response.ReturnMsg = 'Login correcto'
				response.ReturnData = {
					accessToken: jwt.createAccessToken(user),
					refreshToken: jwt.createRefreshToken(user),
				};
			}
		}

	} catch (e) {
		console.log('ERROR in auth.controller => login', e);
		response.ReturnCode = 500;
		response.ReturnMsg = e.message;
	}

	return res.status(response.ReturnCode).json(response);
};

const refreshAccessToken = async (req = request, res = response) => {
	const { refreshToken } = req.body;
	const response = new StandarResponse({});

	try {
		const isTokenExpired = willExpiredToken(refreshToken);

		if (isTokenExpired) {
			response.ReturnCode = 404;
			response.ReturnMsg = 'El refreshToken a expirado';
		} else {
			const { id } = jwt.decodedToken(refreshToken);
			const userStored = await User.findOne({ _id: id });

			if (!userStored) {
				response.ReturnCode = 404;
				response.ReturnMsg = 'Usuario no encontrado';
			} else {
				response.ReturnData = {
					accessToken: jwt.createAccessToken(userStored),
					refreshToken: refreshToken,
				};
			}
		}
	} catch (error) {
		response.ReturnCode = 500;
		response.ReturnMsg = error.message;
	}
    
	return res.status(response.ReturnCode).json(response);
};

module.exports = {
	login,
  refreshAccessToken,
};
