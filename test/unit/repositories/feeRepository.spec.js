/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */

const chai = require('chai');

const { expect } = chai;
const FeeRepository = require('../../../src/repositories/feeRepository');

describe('FeeRepository', () => {
  const expectedResponse = {
    _id: '611c4429f86c8f4346a454bb',
    dddOrigin: '020',
    dddDestination: '021',
    feePerMinute: 2,
    createdAt: '2021-08-17T23:20:09.683Z',
    updatedAt: '2021-08-17T23:20:09.683Z',
    __v: 0,
  };

  const FeeModel = {
    findOne: () => Promise.resolve(expectedResponse),
  };

  describe('findOne()', () => {
    it('return fee', async () => {
      const feeRepository = new FeeRepository({ FeeModel });
      const response = await feeRepository.findOne();
      expect(response).to.equal(expectedResponse);
    });
  });
});
