/* eslint-disable no-unused-vars */
const DDD = require('../entities/ddd');
const errors = require('../infra/errors/errors');
const responses = require('../infra/responses/responses');

class DDDService {
  constructor({ dddRepository }) {
    this.dddRepository = dddRepository;
  }

  async findAll() {
    const ddds = await this.dddRepository.findAll();

    return responses.ok({
      message: '',
      data: ddds,
    });
  }
}

module.exports = DDDService;
