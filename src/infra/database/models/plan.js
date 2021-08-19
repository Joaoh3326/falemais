const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    freeMinutes: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Plan', PlanSchema);
