// eslint-disable-next-line no-unused-vars
const Plan = require('../entities/plan');
const errors = require('../infra/errors');
const responses = require('../infra/responses');
const validations = require('../infra/validations');

class PlanService {
  constructor({ planRepository }) {
    this.planRepository = planRepository;
  }

  async findAll() {
    const plans = await this.planRepository.findAll();

    return responses.ok({
      message: '',
      data: plans,
    });
  }

  async findById(planId) {
    const plan = await this.planRepository.findById(planId);

    if (validations.isNull(plan)) {
      throw errors.notFound({ message: 'Plan not found' });
    }

    return responses.ok({
      message: '',
      data: plan,
    });
  }
}

module.exports = PlanService;
