const chai = require('chai');

const { expect } = chai;
const DDDService = require('../../../src/services/dddService');

describe('DDDService', () => {
  const defaultDdd = {
    _id: '56cb91bdc3464f14678934ca',
    regionName: 'Some Region',
    ddd: '020',
    createdAt: '2021-08-18T02:53:58.632Z',
    updatedAt: '2021-08-18T02:53:58.632Z',
    __v: 0,
  };

  const expectedResponse = {
    success: true,
    statusCode: 200,
    message: '',
    data: [defaultDdd],
  };

  const dddRepository = {
    findAll: () => Promise.resolve([defaultDdd]),
  };

  describe('findAll()', () => {
    it('return list ddds', async () => {
      const dddService = new DDDService({ dddRepository });
      const response = await dddService.findAll();
      expect(response).to.eql(expectedResponse);
    });
  });
});
