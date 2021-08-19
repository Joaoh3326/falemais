const FeeRepository = require('../repositories/feeRepository');
const FeeService = require('../services/feeService');
const PlanRepository = require('../repositories/planRepository');

const database = require('../infra/database');

const generateInstance = () => {
  const { FeeModel, PlanModel } = database.databaseModels();

  const feeRepository = new FeeRepository({
    FeeModel,
  });

  const planRepository = new PlanRepository({
    PlanModel,
  });

  const feeService = new FeeService({
    feeRepository, planRepository,
  });

  return feeService;
};

module.exports = { generateInstance };
