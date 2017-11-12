var express = require('express');
var router = express.Router();
var R = require('ramda');
var db = require('../database/database');
db.connect();

router.get('/:id', function(req, res, next) {
	db.getUserById(req.params.id)
		.then(function(user) {
			var values = [
				user.attributes.amountOfBlobs,
				user.attributes.upwardThrust,
				user.attributes.leftThrust,
				user.attributes.rightThrust,
				user.attributes.downwardThrust,
				user.attributes.anticlockwiseTorque,
				user.attributes.clockwiseTorque
			];
			res.render('users', {
				user: user,
				values: values
			});
		});
});

module.exports = router;