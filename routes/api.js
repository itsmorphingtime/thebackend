var express = require('express');
var router = express.Router();
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
			name: req.body.name,
			score: req.body.score,
			attributes: {
				amountOfBlobs: req.body.amountOfBlobs,
				upwardThrust: req.body.upwardThrust,
				leftThrust: req.body.leftThrust,
				rightThrust: req.body.rightThrust,
				downwardThrust: req.body.downwardThrust,
				anticlockwiseTorque: req.body.anticlockwiseTorque,
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
			score: req.body.score,
			attributes: {
				amountOfBlobs: req.body.amountOfBlobs,
				upwardThrust: req.body.upwardThrust,
				leftThrust: req.body.leftThrust,
				rightThrust: req.body.rightThrust,
				downwardThrust: req.body.downwardThrust,
				anticlockwiseTorque: req.body.anticlockwiseTorque,
				clockwiseTorque: req.body.clockwiseTorque
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