/* eslint-disable no-shadow */
const chai = require('chai');

const { expect } = chai;
const FeeService = require('../../../src/services/feeService');

describe('FeeService', () => {
  const defaultFee = {
    _id: '611c4429f86c8f4346a454bb',
    dddOrigin: '020',
    dddDestination: '021',
    feePerMinute: 2,
    createdAt: '2021-08-17T23:20:09.683Z',
    updatedAt: '2021-08-17T23:20:09.683Z',
    __v: 0,
  };

  const expectedResponse = {
    success: true,
    statusCode: 200,
    message: '',
    data: defaultFee,
  };

  const feeRepository = {
    findOne: () => Promise.resolve(defaultFee),
  };

  describe('findOne()', () => {
    it('return fee', async () => {
      const feeService = new FeeService({ feeRepository });
      const response = await feeService.findOne();
      expect(response).to.eql(expectedResponse);
    });

    context('when dont find fee', () => {
      const feeRepository = {
        findOne: () => null,
      };

      const notFoundError = {
        data: { message: 'Fee not found' },
        message: 'Fee not found',
        statusCode: 404,
        success: false,
      };

      it('return error message', async () => {
        const feeService = new FeeService({ feeRepository });
        try {
          await feeService.findOne();
        } catch (error) {
          expect(error).to.eql(notFoundError);
        }
      });
    });
  });

  describe('calculateFees()', () => {
    const planId = '611c4429f86c8f4346a454bb';
    const planRepository = {
      findById: () => Promise.resolve({
        _id: planId,
        name: 'Some Plan',
        freeMinutes: 20,
        price: 20,
        createdAt: '2021-08-17T23:20:09.682Z',
        updatedAt: '2021-08-17T23:20:09.682Z',
        __v: 0,
      }),
    };

    const expectedResponse = {
      success: true,
      statusCode: 200,
      message: '',
      data: {
        FirstpriceWithPlan: 20,
        nextPricesWithPlan: 0,
        priceWithoutPlan: 40,
      },
    };

    it('return calculated fee', async () => {
      const feeService = new FeeService({ feeRepository, planRepository });
      const response = await feeService.calculateFees({
        dddOrigin: '020', dddDestination: '021', minutes: '20', planId,
      });
      expect(response).to.eql(expectedResponse);
    });

    context('when dont find plan', () => {
      const feeRepository = {
        findOne: () => null,
      };
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
        const feeService = new FeeService({ feeRepository, planRepository });
        try {
          await feeService.calculateFees({
            dddOrigin: '020', dddDestination: '021', minutes: '20', planId,
          });
        } catch (error) {
          expect(error).to.eql(notFoundError);
        }
      });
    });

    context('when dont find Fee', () => {
      const feeRepository = {
        findOne: () => Promise.resolve(null),
      };

      const notFoundError = {
        data: { message: 'Fee not found' },
        message: 'Fee not found',
        statusCode: 404,
        success: false,
      };

      it('return error message', async () => {
        const feeService = new FeeService({ feeRepository, planRepository });
        try {
          await feeService.calculateFees({
            dddOrigin: '020', dddDestination: '021', minutes: '20', planId,
          });
        } catch (error) {
          expect(error).to.eql(notFoundError);
        }
      });
    });
  });
});
