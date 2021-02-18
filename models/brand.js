const mongoose = require('mongoose');
const brands = mongoose.Schema(
  {
    brand_name: {
      type: String,
    },
    user_name: {
      type: String,
    },
    password: {
      type: String,
    },
    profilepic : {
      type : String
    },
    sub_brand: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubBrand',
      },
    ],
  },
  { versionKey: false }
);

brands.pre('save', async function (next) {
  try {
    const data = this;
    const user = await this.constructor.findOne({ user_name: data.user_name,brand_name : data.brand_name });
    if (!user) {
      next();
    }else {
      next(new Error("username must be unique"));
    }
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model('Brand', brands);
