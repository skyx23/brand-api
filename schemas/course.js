const mongoose = require('mongoose');
const course = mongoose.Schema({
    name : {
        type : String
    },
    subject : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subject'
    }]
},{versionKey : false})

course.pre('save', async function (next) {
    try {
        const data = this;
        const course = await this.constructor.findone({name : this.name});
        if (!course) {
            next();
          }else {
            next(new Error("course name must be unique"));
          }
    } catch (error) {
        next(error);
    }
})

module.exports  = mongoose.model('Course',course);