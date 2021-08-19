/* eslint-disable no-unused-vars */
const Fee = require('../entities/fee');
const errors = require('../infra/errors/errors');
const responses = require('../infra/responses/responses');
const validations = require('../infra/validations/validations');

class FeeService {
  constructor({ feeRepository, planRepository }) {
    this.feeRepository = feeRepository;
    this.planRepository = planRepository;
  }

  async findOne(query) {
    const fee = await this.feeRepository.findOne(query);

    if (validations.isNull(fee)) {
      throw errors.notFound({ message: 'Fee not found' });
    }

    return responses.ok({
      message: '',
      data: fee,
    });
  }

  async calculateFees(query) {
    const {
      dddOrigin, dddDestination, minutes, planId,
    } = query;

    const plan = await this.planRepository.findById(planId);

    if (validations.isNull(plan)) {
      throw errors.notFound({ message: 'Plan not found' });
    }

    const fee = await this.feeRepository.findOne({ dddOrigin, dddDestination });

    if (validations.isNull(fee)) {
      throw errors.notFound({ message: 'Fee not found' });
    }

    const minutesSubtracted = (minutes - plan.freeMinutes);
    const nextPricesWithPlan = Math.max(0, minutesSubtracted) * fee.feePerMinute;
    const FirstpriceWithPlan = nextPricesWithPlan + plan.price;
    const priceWithoutPlan = minutes * fee.feePerMinute;

    return responses.ok({
      message: '',
      data: { FirstpriceWithPlan, nextPricesWithPlan, priceWithoutPlan },
    });
  }
}

module.exports = FeeService;
