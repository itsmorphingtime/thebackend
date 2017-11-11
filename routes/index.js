var express = require('express');
var router = express.Router();
var db = require('../database/database');
db.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
	var users = db.getAllUsers()
		.then(function(users) {
			res.render('index', {
				users: users
			});
		});
});

router.get('/:id', function(req, res, next) {
	db.getUserById(req.params.id)
		.then(function(user) {
			res.render('user', {
				user: user
			});
		});
});

module.exports = router;