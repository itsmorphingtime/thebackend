module.exports = (function() {
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	mongoose.Promise = require('q').Promise;
	var R = require('ramda');
	var UserModel = require('./userSchema');
	var uri = 'mongodb://test:test@ds157185.mlab.com:57185/hacksussex';
	var db = null;

	var connect = function() {
		if (db) {
			return;
		}
		mongoose.connect(uri, {
			useMongoClient: true
		});

		db = mongoose.connection;

		db.once('connected', function() {
			console.log('Connected successfully.');
		});

		db.on('error', function(err) {
			console.error('Failed to connect: ', err);
		});
	};

	var getAllUsers = function() {
		return UserModel.find().exec()
			.then(function(docs) {
				return docs;
			})
			.catch(function(err) {
				console.error("Failed to retrieve all users");
				return [];
			});
	};

	var getUserById = function(id) {
		return UserModel.findById(id).exec()
			.then(function(doc) {
				return doc;
			})
			.catch(function(err) {
				console.error("Failed to retrieve user ", id, err);
				return {};
			});
	};

	var createUser = function(args) {
		var newUser = new UserModel(args);
		return newUser.save()
			.then(function(user) {
				return user;
			})
			.catch(function(err) {
				console.error("User creation failed ", err);
				return {};
			});
	};

	var updateUser = function(args) {
		var strippedArgs = R.omit(['id'], args);
		return UserModel.findByIdAndUpdate(args.id, strippedArgs, {
				new: true
			}).exec()
			.then(function(newUser) {
				return newUser;
			})
			.catch(function(err) {
				console.error("User update failed ", err);
				return false;
			});
	};

	var removeUserById = function(id) {
		return UserModel.findByIdAndRemove(id).exec()
			.then(function(deletedUser) {
				return deletedUser;
			})
			.catch(function(err) {
				console.error("User removal failed ", err);
				return false;
			});
	};

	return {
		connect: connect,
		createUser: createUser,
		getAllUsers: getAllUsers,
		getUserById: getUserById,
		updateUser: updateUser,
		removeUserById: removeUserById
	};
})();