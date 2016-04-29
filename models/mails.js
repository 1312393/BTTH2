var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mailSchema = new Schema({
    message : String,
    title : String,
    seen : Boolean,
    createAt : Date,
    sender : {
        type: Schema.ObjectId,
        ref: 'users'
    },
    receiver : {
        type: Schema.ObjectId,
        ref: 'users'
    }

});
var mail = mongoose.model('mails', mailSchema);
module.exports = mail;