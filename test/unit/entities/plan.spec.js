/* eslint-disable no-shadow */
const chai = require('chai');

const { expect } = chai;
const Plan = require('../../../src/entities/plan');

describe('Entity Plan', () => {
  const expectedResponse = {
    name: 'some plan',
    freeMinutes: 20,
    price: 20,
  };

  describe('new Plan()', () => {
    it('return instance Plan', async () => {
      const plan = new Plan({ name: 'some plan', freeMinutes: 20, price: 20 });
      expect(plan).to.eql(expectedResponse);
    });
  });

  describe('plan.isValid()', () => {
    it('return instance Plan', async () => {
      const plan = new Plan({ name: 'some plan', freeMinutes: 20, price: 20 });
      const response = await plan.isValid();
      expect(response).to.eql(expectedResponse);
    });

    context('when name is invalid', () => {
      it('return error validation', async () => {
        const plan = new Plan({ name: 's', freeMinutes: 20, price: 20 });
        const expectedResponse = '"name" length must be at least 3 characters long';
        try {
          await plan.isValid();
        } catch (error) {
          expect(error.details[0].message).to.eql(expectedResponse);
        }
      });
    });

    context('when freeMinutes is invalid', () => {
      it('return error validation', async () => {
        const plan = new Plan({ name: 'some plan', freeMinutes: 'test', price: 20 });
        const expectedResponse = '"freeMinutes" must be a number';
        try {
          await plan.isValid();
        } catch (error) {
          expect(error.details[0].message).to.eql(expectedResponse);
        }
      });
    });

    context('when price is invalid', () => {
      it('return error validation', async () => {
        const plan = new Plan({ name: 'some plan', freeMinutes: 20, price: 'teste' });
        const expectedResponse = '"price" must be a number';
        try {
          await plan.isValid();
        } catch (error) {
          expect(error.details[0].message).to.eql(expectedResponse);
        }
      });
    });
  });
});
