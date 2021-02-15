const mongoose = require('mongoose');
const sub_brands = mongoose.Schema(
  {
    subBrand_name: {
      type: String,
    },
    description : {
      type: String,
    },
    user : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model('SubBrand', sub_brands);
