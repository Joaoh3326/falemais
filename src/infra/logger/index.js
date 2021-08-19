let configPino = {
  level: 'debug',
  prettyPrint: {
    levelFirst: true,
    colorize: true,
  },
};

if (process.env.NODE_ENV === 'production') {
  configPino = { level: 'debug' };
}

const pino = require('pino')(configPino);

const pinoHttp = require('pino-http')({ logger: pino });

module.exports = { logger: pino, loggerHttp: pinoHttp };
