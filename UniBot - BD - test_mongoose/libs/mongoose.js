var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test1');
var db = mongoose.connection;

db.on('error', function(err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback() {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas
var User_state = new Schema({
    UID: { type: Number, required: true },
    state: { type: String, required: true },
});

// validation
User_state.path('UID').validate(function(v) {
    return v.length > 5 && v.length < 70;
});

var UserModel = mongoose.model('User_state', User_state);

module.exports.UserModel = UserModel;