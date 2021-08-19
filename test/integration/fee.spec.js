/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/infra/webserver/express');
const database = require('../../src/infra/database/index');

const { FeeModel, PlanModel } = database.databaseModels();
const { expect } = chai;
chai.use(chaiHttp);

describe('Routes: fees', () => {
  const feeId = '611c4429f86c8f4346a454bb';
  const defaultFee = {
    dddOrigin: '020',
    dddDestination: '021',
    feePerMinute: 2.0,
  };

  const defaultPlan = {
    name: 'Some Plan',
    freeMinutes: 20,
    price: 20,
  };

  before(async () => await database.openConnection());
  after(async () => await database.closeConnection());

  beforeEach(async () => {
    await FeeModel.deleteMany();

    const fee = new FeeModel(defaultFee);
    fee.createdAt = '2021-08-17T23:20:09.683Z';
    fee.updatedAt = '2021-08-17T23:20:09.683Z';
    fee._id = feeId;
    return await fee.save();
  });

  afterEach(async () => await FeeModel.deleteMany());

  describe('GET /v1/fees', () => {
    const expectedResponse = {
      success: true,
      statusCode: 200,
      message: '',
      data: {
        _id: '611c4429f86c8f4346a454bb',
        dddOrigin: '020',
        dddDestination: '021',
        feePerMinute: 2,
        createdAt: '2021-08-17T23:20:09.683Z',
        updatedAt: '2021-08-17T23:20:09.683Z',
        __v: 0,
      },
    };

    it('return fee', async () => {
      const { app } = await server();
      const res = await chai
        .request(app)
        .get('/v1/fees')
        .query({ dddOrigin: '020', dddDestination: '021' });

      expect(res.status).to.equal(200);
      expect(res.body).to.eql(expectedResponse);
    });

    context('When not exists fees in database', () => {
      const notFoundError = {
        data: { message: 'Fee not found' },
        message: 'Fee not found',
        statusCode: 404,
        success: false,
      };

      it('return empty list', async () => {
        await FeeModel.deleteMany();
        const { app } = await server();
        const res = await chai
          .request(app)
          .get('/v1/fees')
          .query({ dddOrigin: '022', dddDestination: '021' });

        expect(res.status).to.equal(404);
        expect(res.body).to.eql(notFoundError);
      });
    });
  });

  describe('GET /v1/fees/calculateFees', () => {
    const planId = '611c4429f86c8f4346a454bb';
    const plan = new PlanModel(defaultPlan);
    plan.createdAt = '2021-08-17T23:20:09.682Z';
    plan.updatedAt = '2021-08-17T23:20:09.682Z';
    plan._id = planId;

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
      const { app } = await server();
      await plan.save();

      const res = await chai
        .request(app)
        .get('/v1/fees/calculateFees')
        .query({
          dddOrigin: '020', dddDestination: '021', minutes: 20, planId,
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.eql(expectedResponse);
    });

    context('When not exists Plan in database', () => {
      const notFoundError = {
        data: { message: 'Plan not found' },
        message: 'Plan not found',
        statusCode: 404,
        success: false,
      };
      const wrongId = '611c23e086e5ad358f9cd407';

      it('return not found error', async () => {
        await FeeModel.deleteMany();
        const { app } = await server();
        const res = await chai
          .request(app)
          .get('/v1/fees/calculateFees')
          .query({
            dddOrigin: '020', dddDestination: '021', minutes: 20, planId: wrongId,
          });

        expect(res.status).to.equal(404);
        expect(res.body).to.eql(notFoundError);
      });
    });

    context('When not exists Fee in database', () => {
      const notFoundError = {
        data: { message: 'Fee not found' },
        message: 'Fee not found',
        statusCode: 404,
        success: false,
      };

      it('return not found error', async () => {
        await FeeModel.deleteMany();
        const { app } = await server();
        const res = await chai
          .request(app)
          .get('/v1/fees/calculateFees')
          .query({
            dddOrigin: '022', dddDestination: '021', minutes: 20, planId,
          });

        expect(res.status).to.equal(404);
        expect(res.body).to.eql(notFoundError);
      });
    });
  });
});
