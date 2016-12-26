var express 	= require('express');
var bodyParser 	= require('body-parser');
var morgan 		= require('morgan'); // HTTP request logger middleware
var compression = require('compression'); // HTTP request compressor
var favicon 	= require('serve-favicon'); // Favicon handler
var methodOverride = require('method-override'); // Override HTTP verbs.
var config 		= require('./config');
var app 		= express();
var modelsPath	= config.root + '/app/models';
var fs 			= require('fs');
var cors 		= require('cors');
var Waterline = require('waterline');

// Database connection
var orm = new Waterline();

// requiring all models from the /app/models folder
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
  	var name = file.replace(/\.js$/i, '');
    var model = require(modelsPath + '/' + file);

    // Model schema type polyfill when using mongo db -- for ID attribute
    if (model.extend().prototype.connection == 'mongo'){
    	var attrs = model.extend().prototype.attributes;
    	if (Object.keys(attrs).indexOf('id') > -1){
    		var id = model.extend().prototype.attributes['id'];
    		if (typeof(id) == 'object' && 'type' in id && id['type'] == 'integer'){
    			id['type'] = 'objectid';
    			model.extend().prototype.attributes['id'] = id;
    		}
    		else if(typeof(id) == 'string' && id == 'integer'){
    			id = 'objectid';
    			model.extend().prototype.attributes['id'] = id;
    		}
    	}
    }
    //console.log(model.extend().prototype.attributes)
    
    orm.loadCollection(model);
  }
});

// CORS configuration
/*var whitelist = ['http://localhost:3000', 'http://example2.com'];
var corsOption = {
	origin: function(origin, callback){
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
	}
};*/

// ------ Express Configuration ----------------
app.use(compression());
//app.use(cors(corsOption));
app.use(express.static(config.root + '/public'));
app.set('port', config.port);
app.use(favicon(config.root + '/public/favicon.ico'));

// request logger
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Routes
require('./config/routes')(app);

app.disable('x-powered-by');

// ORM Init
orm.initialize(config, function(err, models){
	if(err) return console.log(err.name + ': ' + err.message);;

	app.models = models.collections;
	app.connections = models.connections;
	app.listen(config.port);
	console.log("---------- Environment: %s ----------------", config.env);
	console.log("Server listening on localhost:" + config.port);
});