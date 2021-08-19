const DDDRepository = require('../repositories/dddRepository');
const DDDService = require('../services/dddService');
const database = require('../infra/database');

const generateInstance = () => {
  const { DDDModel } = database.databaseModels();
  const dddRepository = new DDDRepository({
    DDDModel,
  });

  const dddService = new DDDService({
    dddRepository,
  });

  return dddService;
};

module.exports = { generateInstance };
