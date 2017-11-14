var express = require('express');
var router = express.Router();
var randomWords = require('random-words');
var db = require('../database/database');
db.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.getAllUsers()
		.then(function(data) {
			res.json(data);
		});
});

router.get('/:id', function(req, res, next) {
	db.getUserById(req.params.id)
		.then(function(data) {
			res.json(data);
		});
});

router.post('/', function(req, res, next) {
	db.createUser({
			name: req.body.name || randomWords(3).join("-"),
			score: parseInt(req.body.score) || 0,
			attributes: {
				amountOfBlobs: parseInt(req.body.amountOfBlobs) || 0,
				upwardThrust: parseInt(req.body.upwardThrust) || 0,
				leftThrust: parseInt(req.body.leftThrust) || 0,
				rightThrust: parseInt(req.body.rightThrust) || 0,
				downwardThrust: parseInt(req.body.downwardThrust) || 0,
				anticlockwiseTorque: parseInt(req.body.anticlockwiseTorque) || 0,
				clockwiseTorque: parseInt(req.body.clockwiseTorque) || 0,
				timeStamp: req.body.timeStamp
			}
		})
		.then(function(data) {
			res.json(data);
		});
});

router.put('/', function(req, res, next) {
	if (req.rawBody) {
		req.body = req.rawBody;
	}
	db.updateUser({
			id: req.body._id,
			name: req.body.name,
			score: parseInt(req.body.score) || 0,
			$push: {
				attributes: {
					amountOfBlobs: parseInt(req.body.amountOfBlobs) || 0,
					upwardThrust: parseInt(req.body.upwardThrust) || 0,
					leftThrust: parseInt(req.body.leftThrust) || 0,
					rightThrust: parseInt(req.body.rightThrust) || 0,
					downwardThrust: parseInt(req.body.downwardThrust) || 0,
					anticlockwiseTorque: parseInt(req.body.anticlockwiseTorque) || 0,
					clockwiseTorque: parseInt(req.body.clockwiseTorque) || 0,
					timeStamp: req.body.timeStamp
				}
			}
		})
		.then(function(data) {
			res.json(data);
		});
});

router.delete('/:id', function(req, res, next) {
	db.removeUserById(req.params.id)
		.then(function(data) {
			res.json(data);
		});
});

module.exports = router;