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
			score: parseInt(req.body.score),
			attributes: {
				amountOfBlobs: parseInt(req.body.amountOfBlobs),
				upwardThrust: parseInt(req.body.upwardThrust),
				leftThrust: parseInt(req.body.leftThrust),
				rightThrust: parseInt(req.body.rightThrust),
				downwardThrust: parseInt(req.body.downwardThrust),
				anticlockwiseTorque: parseInt(req.body.anticlockwiseTorque),
				clockwiseTorque: parseInt(req.body.clockwiseTorque),
				timeStamp: req.body.timeStamp
			}
		})
		.then(function(data) {
			res.json(data);
		});
});

router.put('/', function(req, res, next) {
	db.updateUser({
			id: req.body._id,
			name: req.body.name,
			score: parseInt(req.body.score),
			$push: {
				attributes: {
					amountOfBlobs: parseInt(req.body.amountOfBlobs),
					upwardThrust: parseInt(req.body.upwardThrust),
					leftThrust: parseInt(req.body.leftThrust),
					rightThrust: parseInt(req.body.rightThrust),
					downwardThrust: parseInt(req.body.downwardThrust),
					anticlockwiseTorque: parseInt(req.body.anticlockwiseTorque),
					clockwiseTorque: parseInt(req.body.clockwiseTorque),
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