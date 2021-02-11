const mongoose = require('mongoose');
const user = mongoose.Schema({
    name : {
        type : String
    },
    user_name : {
        type : String
    },
    role : {
        type : String
    },
    password : {
        type : String
    },
    subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subject'
    }

})
module.exports  = mongoose.model('User',user);