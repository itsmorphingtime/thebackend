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
			var latestAttributes = user.attributes[0];
			var values = [
				latestAttributes.amountOfBlobs,
				latestAttributes.upwardThrust,
				latestAttributes.leftThrust,
				latestAttributes.rightThrust,
				latestAttributes.downwardThrust,
				latestAttributes.anticlockwiseTorque,
				latestAttributes.clockwiseTorque
			];
			res.render('users', {
				user: user,
				values: values
			});
		});
});

module.exports = router;