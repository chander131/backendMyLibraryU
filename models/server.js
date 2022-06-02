const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const AppConfig = require('../config/AppConfig');
const MongoConnection = require('../db/dbConnection');

// Load routings
const AuthRoutes = require('../routes/auth.routes');
const UserRoutes = require('../routes/user.routes');
const GenderBookRoutes = require('../routes/genderBook.routes');
const BookRoutes = require('../routes/book.routes');
const BookHistoryRoutes = require('../routes/bookHistory.routes');

class Server {

	constructor() {
		this.app = express();
		this.port = AppConfig.port;
		this.apiPaths = {
			base: '/api',
			auth: '/auth',
			user: '/users',
			genderBook: '/genderBook',
			book: '/book',
			bookHistory: '/bookHistory',
		};

		// Conexion a DB
		this.conectarDB();

		// Middlewares
		this.middlewares();

		// Rutas de mi aplicacion
		this.routes();
	}

	async conectarDB() {
		await MongoConnection();
	}

	middlewares() {
		// CORS
		this.app.use(cors());
		this.app.use(bodyParser.json({ limit: '200mb' }));
		this.app.use(bodyParser.urlencoded({ limit: '200mb', extended: false, parameterLimit: 1000000 }));

		// Lectura y parseo del body
		this.app.use(express.json());

		// Configuración Header HTTP
		this.app.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header(
				"Access-Control-Allow-Headers",
				"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
			);
			res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
			res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
			next();
		});

		// Directorio publico
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(`${this.apiPaths.base}/${AppConfig.apiVersion}${this.apiPaths.auth}`, AuthRoutes);
		this.app.use(`${this.apiPaths.base}/${AppConfig.apiVersion}${this.apiPaths.user}`, UserRoutes);
		this.app.use(require('../middlewares').validateJWT);
		this.app.use(`${this.apiPaths.base}/${AppConfig.apiVersion}${this.apiPaths.genderBook}`, GenderBookRoutes);
		this.app.use(`${this.apiPaths.base}/${AppConfig.apiVersion}${this.apiPaths.book}`, BookRoutes);
		this.app.use(`${this.apiPaths.base}/${AppConfig.apiVersion}${this.apiPaths.bookHistory}`, BookHistoryRoutes);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('######################################');
			console.log('######################################');
			console.log(`##### SERVER RUN IN PORT => ${this.port} #####`);
			console.log('######################################');
			console.log('######################################');
		});
	}
}

module.exports = Server;
