/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */

const chai = require('chai');

const { expect } = chai;
const PlanRepository = require('../../../src/repositories/planRepository');

describe('PlanRepository', () => {
  const planId = '611c4429f86c8f4346a454bb';
  const expectedResponse = {
    _id: planId,
    name: 'Some Plan',
    freeMinutes: 20,
    price: 20,
    createdAt: '2021-08-17T23:20:09.682Z',
    updatedAt: '2021-08-17T23:20:09.682Z',
    __v: 0,
  };

  const PlanModel = {
    find: () => Promise.resolve([expectedResponse]),
    findById: () => Promise.resolve(expectedResponse),
  };

  describe('findAll()', () => {
    it('return list plans', async () => {
      const planRepository = new PlanRepository({ PlanModel });
      const response = await planRepository.findAll();
      expect(response).to.eql([expectedResponse]);
    });
  });

  describe('findById()', () => {
    it('return plan', async () => {
      const planRepository = new PlanRepository({ PlanModel });
      const response = await planRepository.findById(planId);
      expect(response).to.equal(expectedResponse);
    });
  });
});
