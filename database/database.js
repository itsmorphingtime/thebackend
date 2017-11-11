module.exports = (function() {
	var mongoose = require('mongoose');
	mongoose.Promise = require('q').Promise;
	var uri = 'mongodb://127.0.0.1:27017';
	var db = null;

	var connect = function() {
		mongoose.connect(uri, {
			useMongoClient: true
		});

		db = mongoose.connection;

		db.once('connected', function() {
			console.log("Connection succeeded");
		});

		db.on('error', function(err) {
			console.error("Failed to connect: " + err);
		});
	};

	return {
		connect: connect
	};

})();