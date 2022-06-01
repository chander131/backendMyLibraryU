module.exports = {
	apiVersion: process.env.API_VERSION,
	ipServer: process.env.IP_SERVER,
	uriDb: process.env.MONGODB_CNN,
	port: process.env.PORT || 5001,
	environment: process.env.NODE_ENV,
};
