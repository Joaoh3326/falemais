const Joi = require('joi');

class Fee {
  constructor({ dddOrigin, dddDestination, feePerMinute }) {
    this.dddOrigin = dddOrigin;
    this.dddDestination = dddDestination;
    this.feePerMinute = feePerMinute;
  }

  async isValid() {
    const schema = Joi.object({
      dddOrigin: Joi.string().min(3).max(3).required(),
      dddDestination: Joi.string().min(3).max(3).required(),
      feePerMinute: Joi.number().required(),
    });

    return schema.validateAsync(this);
  }
}

module.exports = Fee;
