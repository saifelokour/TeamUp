var user = require('../users/userController.js');
var game = require('../games/gameController.js');
var comment = require ('../comment/commentController.js');
var category = require('../category/categoryController.js');

var helpers = require('./helpers.js');

module.exports = function(app, express) {


	// auth routes
	app.post('/api/users/signup', user.signup);
	app.post('/api/users/signin', user.signin);
	app.post('/api/users/fbSignin', user.fbSignin);
	
	// user routes
	app.get('/api/user/:id', user.getUser);
	app.put('/api/user/:id/edit', user.editUser );
	app.post('/api/game/players', user.getPlayers);
	
	// game routes
	app.post('/api/game', game.createGame);
	app.get('/api/games', game.getAllGames);
	app.get('/api/game/:id', game.getGame);
	app.put('/api/game/removePlayer/:id', game.removePlayer);
	app.put('/api/game/:id/edit', game.editGame);
	app.post('/api/game/:id', game.insertPlayer);
	

	//Comment Route
	app.post('/api/comment',comment.insertComment);
	app.get('/api/comments',comment.getComment)
	


	// category routes
	app.get('/api/categories', category.getAll);
	app.get('/api/category/:id', category.getCategory);
	app.post('/api/category', category.addCategory);
	app.put('/api/category/:id/edit', category.editCategory);
	app.delete('/api/category/:id/delete', category.deleteCategory);

	//error handling
	app.use(helpers.errorLogger);
	app.use(helpers.errorHandler);
};
