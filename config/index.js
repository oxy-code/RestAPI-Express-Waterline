var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	mysqlAdapter = require('sails-mysql'),
	mongoAdapter = require('sails-mongo'),
	env = process.env.NODE_ENV || 'development';

var connections = require('./connections');

var config = {

	development: {
		adapters: {
			'default': mysqlAdapter,
			mysql: mysqlAdapter,
			mongo: mongoAdapter
		},
		connections: connections['development'],
		root: rootPath,
		app: {
			name: 'Rest API'
		},
		port: 8080,
		env: env,
		salt: '11ba652e2f91beadf48b951fd873jh347ed6edf'
	},	

	production: {
		adapters: {
			'default': mysqlAdapter,
			mysql: mysqlAdapter
		},
		connections: connections['production'],
		root: rootPath,
		app: {
			name: 'Rest API'
		},
		port: 80,
		env: env,
		salt: '11ba652e2f91beadf48b951fd873jh347ed6edf'
	},

	test: {
		root: rootPath,
		app: {
			name: 'Rest API'
		},
		port: 3000,
		env: env,
		salt: ''
	}

};

module.exports = config[env];