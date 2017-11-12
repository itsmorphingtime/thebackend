var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	score: Number,
	attributes: {
		forward_speed: Number,
		leftward_speed: Number,
		rightward_speed: Number,
		backward_speed: Number,
		left_spin: Number
	}
});

module.exports = mongoose.model('User', UserSchema);