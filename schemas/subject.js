const mongoose = require('mongoose');
const subject = mongoose.Schema({
    name : {
        type : String
    }
})
module.exports  = mongoose.model('Subject',subject);