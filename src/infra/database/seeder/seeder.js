if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

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
