const seeder = require('mongoose-seed');
const seeds = require('./seeds/index');

seeder.connect(process.env.DB_HOST, () => {
  seeder.loadModels([
    './src/infra/database/models/ddd.js',
    './src/infra/database/models/plan.js',
    './src/infra/database/models/fee.js',
  ]);

  seeder.clearModels(['DDD', 'Plan', 'Fee'], () => {
    seeder.populateModels(seeds, () => {
      seeder.disconnect();
    });
  });
});
