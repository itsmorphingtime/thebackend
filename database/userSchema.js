var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	score: Number,
	attributes: {
		amountOfBlobs: Number,
		upwardThrust: Number,
		leftThrust: Number,
		rightThrust: Number,
		downwardThrust: Number,
		anticlockwiseTorque: Number,
		clockwiseTorque: Number
	}
});

module.exports = mongoose.model('User', UserSchema);