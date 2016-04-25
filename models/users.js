var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email : String,
    password : String,
    fullName : String
});
var user = mongoose.model('users', userSchema);
module.exports = user;