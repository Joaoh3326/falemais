const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema(
  {
    dddOrigin: {
      type: String,
      required: true,
    },
    dddDestination: {
      type: String,
      required: true,
    },
    feePerMinute: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Fee', FeeSchema);
