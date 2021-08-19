/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */

const chai = require('chai');

const { expect } = chai;
const DDDRepository = require('../../../src/repositories/dddRepository');

describe('DDDRepository', () => {
  const expectedResponse = [
    {
      _id: '56cb91bdc3464f14678934ca',
      regionName: 'Some Region',
      ddd: '020',
      createdAt: '2021-08-18T02:53:58.632Z',
      updatedAt: '2021-08-18T02:53:58.632Z',
      __v: 0,
    },
  ];

  const DDDModel = {
    find: () => Promise.resolve(expectedResponse),
  };

  describe('findAll()', () => {
    it('return list ddds', async () => {
      const dddRepository = new DDDRepository({ DDDModel });
      const response = await dddRepository.findAll();
      expect(response).to.equal(expectedResponse);
    });
  });
});
