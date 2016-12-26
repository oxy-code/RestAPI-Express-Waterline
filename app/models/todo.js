var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({

	identity: 'todo',
	tableName: 'todos',
	connection: 'mysql',
	schema: true,

	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			unique: true
		},
		text: 'string',
		isActive: {
			type: 'boolean',
			defaultsTo: true
		}
	}

});