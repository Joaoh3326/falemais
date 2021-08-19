const webserver = require('./infra/webserver/express');
const { logger } = require('./infra/logger');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    const { app, database } = await webserver();
    const server = app.listen(PORT, () => logger.info(`app running on port ${PORT}`));

    const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) => process.on(sig, () => server.close((err) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
      database.closeConnection(() => {
        logger.info('Database connection closed!');
        process.exit(0);
      });
    })));
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
