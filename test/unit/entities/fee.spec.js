/* eslint-disable no-shadow */

const chai = require('chai');

const { expect } = chai;
const Fee = require('../../../src/entities/fee');

describe('Entity Fee', () => {
  const expectedResponse = {
    dddOrigin: '020',
    dddDestination: '021',
    feePerMinute: 2.0,
  };

  describe('new Fee()', () => {
    it('return instance Fee', async () => {
      const fee = new Fee({ dddOrigin: '020', dddDestination: '021', feePerMinute: 2.0 });

      expect(fee).to.eql(expectedResponse);
    });
  });

  describe('fee.isValid()', () => {
    it('return instance Fee', async () => {
      const fee = new Fee({ dddOrigin: '020', dddDestination: '021', feePerMinute: 2.0 });
      const response = await fee.isValid();
      expect(response).to.eql(expectedResponse);
    });

    context('when dddOrigin is invalid', () => {
      it('return error validation', async () => {
        const fee = new Fee({ dddOrigin: '0200', dddDestination: '021', feePerMinute: 2.0 });
        const expectedResponse = '"dddOrigin" length must be less than or equal to 3 characters long';
        try {
          await fee.isValid();
        } catch (error) {
          expect(error.details[0].message).to.eql(expectedResponse);
        }
      });
    });

    context('when dddDestination is invalid', () => {
      it('return error validation', async () => {
        const fee = new Fee({ dddOrigin: '020', dddDestination: '0210', feePerMinute: 2.0 });
        const expectedResponse = '"dddDestination" length must be less than or equal to 3 characters long';
        try {
          await fee.isValid();
        } catch (error) {
          expect(error.details[0].message).to.eql(expectedResponse);
        }
      });
    });

    context('when feePerMinute is invalid', () => {
      it('return error validation', async () => {
        const fee = new Fee({ dddOrigin: '020', dddDestination: '021', feePerMinute: 'test' });
        const expectedResponse = '"feePerMinute" must be a number';
        try {
          await fee.isValid();
        } catch (error) {
          expect(error.details[0].message).to.eql(expectedResponse);
        }
      });
    });
  });
});
