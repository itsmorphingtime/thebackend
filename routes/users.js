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
			score: req.body.score
		})
		.then(function(data) {
			res.json(data);
		});
});

router.put('/', function(req, res, next) {
	var promise = db.updateUser({
			id: req.body._id,
			name: req.body.name,
			score: req.body.score
		});
	console.log(promise);
		promise.then(function(data) {
			res.json(data);
		});
});

router.delete('/:id', function(req, res, next) {
	var promise = db.removeUserById(req.params.id);
	console.log(promise);
		promise.then(function(data) {
			res.json(data);
		});
});

module.exports = router;