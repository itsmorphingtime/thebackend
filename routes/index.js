var express = require('express');
var router = express.Router();
var db = require('../database/database');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.connect();
  res.render('index', { title: 'Express' });
});

module.exports = router;
