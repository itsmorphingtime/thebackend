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

module.exports = router;