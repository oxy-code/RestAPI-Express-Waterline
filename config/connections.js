/*
 * If both db adapters are needed leave uncommenting all the engines or
 * comment which you don't needed for now
 */

module.exports = {
	development: {
		mysql: {
			adapter: 'mysql',
			database: 'RestAPI',
			user: 'root',
			password: '',
			port: 3306
		}/*,
		mongo: {
			adapter: 'mongo',
			database: 'RestAPI',
			host: 'localhost',
			port: 27017,
			user: 'root',
			password: ''
		}*/
	},
	production: {
		mysql: {
			adapter: 'mysql',
			database: '',
			user: '',
			password: '',
			port: 3306
		},
		mongo: {
			adapter: 'mongo',
			database: '',
			host: '',
			port: null,
			user: '',
			password: ''
		}
	}
};