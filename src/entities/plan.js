const Joi = require('joi');

class Plan {
  constructor({ name, freeMinutes, price }) {
    this.name = name;
    this.freeMinutes = freeMinutes;
    this.price = price;
  }

  async isValid() {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      freeMinutes: Joi.number().required(),
      price: Joi.number().required(),
    });

    return schema.validateAsync(this);
  }
}

module.exports = Plan;
