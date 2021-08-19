/* eslint-disable no-shadow */
const chai = require('chai');

const { expect } = chai;
const PlanService = require('../../../src/services/planService');

describe('PlanService', () => {
  const planId = '56cb91bdc3464f14678934ca';
  const defaultPlan = {
    _id: planId,
    name: 'Some Plan',
    freeMinutes: 20,
    price: 20,
    createdAt: '2021-08-17T23:20:09.682Z',
    updatedAt: '2021-08-17T23:20:09.682Z',
    __v: 0,
  };

  const expectedResponse = {
    success: true,
    statusCode: 200,
    message: '',
    data: [defaultPlan],
  };

  const planRepository = {
    findAll: () => Promise.resolve([defaultPlan]),
    findById: () => Promise.resolve(defaultPlan),
  };

  describe('findAll()', () => {
    it('return list plans', async () => {
      const planService = new PlanService({ planRepository });
      const response = await planService.findAll();
      expect(response).to.eql(expectedResponse);
    });
  });

  describe('findById()', () => {
    const expectedResponse = {
      success: true,
      statusCode: 200,
      message: '',
      data: defaultPlan,
    };

    it('return plan', async () => {
      const planService = new PlanService({ planRepository });
      const response = await planService.findById(planId);
      expect(response).to.eql(expectedResponse);
    });

    context('when dont find plan', () => {
      const planRepository = {
        findById: () => Promise.resolve(null),
      };

      const notFoundError = {
        data: { message: 'Plan not found' },
        message: 'Plan not found',
        statusCode: 404,
        success: false,
      };

      it('return error message', async () => {
        const planService = new PlanService({ planRepository });
        try {
          await planService.findById(planId);
        } catch (error) {
          expect(error).to.eql(notFoundError);
        }
      });
    });
  });
});
