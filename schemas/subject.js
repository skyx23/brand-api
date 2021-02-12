const mongoose = require('mongoose');
const subject = mongoose.Schema({
    name : {
        type : String
    }
},{versionKey : false})
module.exports  = mongoose.model('Subject',subject);