const PlanRepository = require('../repositories/planRepository');
const PlanService = require('../services/planService');
const database = require('../infra/database');

const generateInstance = () => {
  const { PlanModel } = database.databaseModels();
  const planRepository = new PlanRepository({
    PlanModel,
  });

  const planService = new PlanService({
    planRepository,
  });

  return planService;
};

module.exports = { generateInstance };
