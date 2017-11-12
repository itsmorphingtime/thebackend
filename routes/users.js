var express = require('express');
var router = express.Router();
var R = require('ramda');
var db = require('../database/database');
db.connect();

router.get('/:id', function(req, res, next) {
	db.getUserById(req.params.id)
		.then(function(user) {
			user.attributes = R.sort(function(a, b) {
				return b.timeStamp - a.timeStamp;
			}, user.attributes);

			var values = [
				R.reduce((acc, attributes) => acc += attributes.amountOfBlobs || 0, 0, user.attributes) / user.attributes.length,
				R.reduce((acc, attributes) => acc += attributes.upwardThrust || 0, 0, user.attributes) / user.attributes.length,
				R.reduce((acc, attributes) => acc += attributes.leftThrust || 0, 0, user.attributes) / user.attributes.length,
				R.reduce((acc, attributes) => acc += attributes.rightThrust || 0, 0, user.attributes) / user.attributes.length,
				R.reduce((acc, attributes) => acc += attributes.downwardThrust || 0, 0, user.attributes) / user.attributes.length,
				R.reduce((acc, attributes) => acc += attributes.anticlockwiseTorque || 0, 0, user.attributes) / user.attributes.length,
				R.reduce((acc, attributes) => acc += attributes.clockwiseTorqu || 0, 0, user.attributes) / user.attributes.length
			];
			res.render('users', {
				user: user,
				values: values
			});
		});
});

module.exports = router;