const pino = require('pino')({
  level: 'debug',
  prettyPrint: {
    levelFirst: true,
    colorize: true,
  },
});

const pinoHttp = require('pino-http')({ logger: pino });

module.exports = { logger: pino, loggerHttp: pinoHttp };
