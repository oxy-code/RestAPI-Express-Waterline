module.exports = function (app) {

    //routes
    var todo = require('../app/controllers/todo');

    app.get('/v1/todo', todo.index);
    app.post('/v1/todo', todo.save);
    app.put('/v1/todo/:id', todo.update);
    app.delete('/v1/todo/:id', todo.remove);

    // when the requested uri is not found
    app.use(function(req, res) {
        res.status(404).json({Message:'Your page not found!'});
    });

};