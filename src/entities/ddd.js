const Joi = require('joi');

class DDD {
  constructor({ regionName, ddd }) {
    this.regionName = regionName;
    this.ddd = ddd;
  }

  async isValid() {
    const schema = Joi.object({
      regionName: Joi.string().min(3).max(30).required(),
      ddd: Joi.string().min(3).max(3).required(),
    });

    return schema.validateAsync(this);
  }
}

module.exports = DDD;
