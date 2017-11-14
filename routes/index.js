var express = require('express');
var router = express.Router();
var R = require('ramda');
var db = require('../database/database');
db.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
	var users = db.getAllUsers()
		.then(function(users) {
			users = R.sort(function(a, b) {
				return b.timeStamp - a.timeStamp;
			}, R.map(function(user) {
				user.timeStamp = R.sort(function(a, b) {
					return b.timeStamp - a.timeStamp;
				}, user.attributes)[0].timeStamp;
				return user;
			}, users));
			res.render('index', {
				users: users
			});
		});
});

module.exports = router;