const mongoose = require('mongoose');

const DDDSchema = new mongoose.Schema(
  {
    regionName: {
      type: String,
      required: true,
    },
    ddd: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('DDD', DDDSchema);
