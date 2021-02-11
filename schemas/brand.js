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
    location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model('Brand', brands);
