const mongoose = require('mongoose');
const course = mongoose.Schema({
    name : {
        type : String
    },
    subject : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subject'
    }]
})
module.exports  = mongoose.model('Course',course);