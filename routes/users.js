var express = require('express');
var router = express.Router();
var $ = require('jquery');
var Chart = require('chart.js');
var db = require('../database/database');
db.connect();

router.get('/:id', function(req, res, next) {
	db.getUserById(req.params.id)
		.then(function(user) {
			res.render('users', {
				user: user,
				values: [12, 19, 3, 5, 20]
			});
		});
});

module.exports = router;