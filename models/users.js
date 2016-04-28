var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email : String,
    hash : String,
    salt : String,
    fullName : String,
    friend : [{
                type: Schema.ObjectId,
                ref: 'users'
    }]
});
var user = mongoose.model('users', userSchema);
module.exports = user;