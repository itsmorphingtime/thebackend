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
	console.log(typeof req.body.attributes.timeStamp, req.body.attributes.timeStamp, new Date(req.body.attributes.timeStamp));
	var myAttr = getProperAttributes(req.body);
	db.createUser({
			name: req.body.name || randomWords(3).join("-"),
			score: parseInt(req.body.score) || 0,
			attributes: myAttr
		})
		.then(function(data) {
			res.json(data);
		});
});

router.put('/', function(req, res, next) {
	if (req.rawBody) {
		req.body = JSON.parse(req.rawBody);
	}
	var myAttr = getProperAttributes(req.body);
	db.updateUser({
			id: req.body._id,
			name: req.body.name,
			score: parseInt(req.body.score) || 0,
			$push: {
				attributes: myAttr
			}
		})
		.then(function(data) {
			res.json(data);
		});
});

function getProperAttributes(body) {
	if (body.attributes) {
		return {
			amountOfBlobs: parseInt(body.attributes.amountOfBlobs) || 0,
			upwardThrust: parseInt(body.attributes.upwardThrust) || 0,
			leftThrust: parseInt(body.attributes.leftThrust) || 0,
			rightThrust: parseInt(body.attributes.rightThrust) || 0,
			downwardThrust: parseInt(body.attributes.downwardThrust) || 0,
			anticlockwiseTorque: parseInt(body.attributes.anticlockwiseTorque) || 0,
			clockwiseTorque: parseInt(body.attributes.clockwiseTorque) || 0,
			timeStamp: new Date(body.attributes.timeStamp)
		};
	} else {
		return {
			amountOfBlobs: parseInt(body.amountOfBlobs) || 0,
			upwardThrust: parseInt(body.upwardThrust) || 0,
			leftThrust: parseInt(body.leftThrust) || 0,
			rightThrust: parseInt(body.rightThrust) || 0,
			downwardThrust: parseInt(body.downwardThrust) || 0,
			anticlockwiseTorque: parseInt(body.anticlockwiseTorque) || 0,
			clockwiseTorque: parseInt(body.clockwiseTorque) || 0,
			timeStamp: new Date(body.timeStamp)
		};
	}
}

router.delete('/:id', function(req, res, next) {
	db.removeUserById(req.params.id)
		.then(function(data) {
			res.json(data);
		});
});

module.exports = router;