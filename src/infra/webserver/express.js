if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../documentation/swagger.json');
const database = require('../database');
const routes = require('./routes/v1');
const { logger, loggerHttp } = require('../logger');

class ConfigureExpress {
  constructor() {
    this.express = express();
    this.database = database;

    this.middlewares();
    this.routes();
    this.errorHandler();
    this.documentation();
  }

  middlewares() {
    this.express.use(loggerHttp);
    this.express.use(express.json());
  }

  routes() {
    this.express.use('/v1', routes);
  }

  errorHandler() {
    // eslint-disable-next-line no-unused-vars
    this.express.use((error, req, res, next) => {
      logger.error(error);
      res.status(error.statusCode || 500);
      res.json({
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        data: error.data,
      });
    });
  }

  documentation() {
    this.express.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }
}

module.exports = async () => {
  const app = new ConfigureExpress();
  await app.database.openConnection();
  logger.info('Database is connected');
  return { app: app.express, database: app.database };
};
