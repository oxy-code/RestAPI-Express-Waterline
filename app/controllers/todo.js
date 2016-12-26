/**
 * List all the todos
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.index = function(req, res){
	req.app.models.todo.find().exec(function(err, models) {
		if(err) return res.json({ err: err }, 500);
		res.json(models);
	});
}

/**
 * Save a Todo item
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.save = function(req, res){
	req.app.models.todo.create(req.body, function(err, model) {
		if(err) return res.json({ err: err }, 500);
		res.json(model);
	});
}

/**
 * Update a Todo item
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.update = function(req, res){
	delete req.body.id;
	req.app.models.todo.update({ id: req.params.id }, req.body, function(err, model) {
		if(err) return res.json({ err: err }, 500);
		res.json(model);
	});
}

/**
 * Delete a Todo item
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.remove = function(req, res){
	req.app.models.todo.destroy({ id: req.params.id }, function(err) {
		if(err) return res.json({ err: err }, 500);
		res.json({ message: 'deleted' });
	});
}