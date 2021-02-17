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
    profilepic : {
        type : String
    },
    subject : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subject'
    }

})

user.pre('save', async function (next){
    try{
        const data = this
        const user = await this.constructor.findone({user_name : this.user_name});
        if (!user) {
            next();
        }else {
            next(new Error("username must be unique"));
        }
    }catch(err){
        next(err);
    }
})

module.exports  = mongoose.model('User',user);