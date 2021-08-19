/* eslint-disable no-shadow */

const chai = require('chai');

const { expect } = chai;
const DDD = require('../../../src/entities/ddd');

describe('Entity DDD', () => {
  const expectedResponse = {
    regionName: 'some region',
    ddd: '020',
  };

  describe('new DDD()', () => {
    it('return instance DDD', async () => {
      const ddd = new DDD({ regionName: 'some region', ddd: '020' });

      expect(ddd).to.eql(expectedResponse);
    });
  });

  describe('ddd.isValid()', () => {
    it('return instance DDD', async () => {
      const ddd = new DDD({ regionName: 'some region', ddd: '020' });
      const response = await ddd.isValid();
      expect(response).to.eql(expectedResponse);
    });

    context('when regionName is invalid', () => {
      it('return error validation', async () => {
        const ddd = new DDD({ regionName: 's', ddd: '020' });
        const expectedResponse = '"regionName" length must be at least 3 characters long';
        try {
          await ddd.isValid();
        } catch (error) {
          expect(error.details[0].message).to.eql(expectedResponse);
        }
      });
    });

    context('when DDD is invalid', () => {
      it('return error validation', async () => {
        const ddd = new DDD({ regionName: 'some region', ddd: '0200' });
        const expectedResponse = '"ddd" length must be less than or equal to 3 characters long';
        try {
          await ddd.isValid();
        } catch (error) {
          expect(error.details[0].message).to.eql(expectedResponse);
        }
      });
    });
  });
});
