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
    sub_brand: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubBrand',
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model('Brand', brands);
