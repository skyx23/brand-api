const mongoose = require('mongoose');
const subject = mongoose.Schema({
    name : {
        type : String
    }
},{versionKey : false})

subject.pre('save', async function (next) {
    try {
        const data = this;
        const subject = await this.constructor.findone({name : this.name});
        if (!subject) {
            next();
          }else {
            next(new Error("subject name must be unique"));
          }
    } catch (error) {
        next(error);
    }
})
module.exports  = mongoose.model('Subject',subject);