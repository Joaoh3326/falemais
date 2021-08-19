/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/infra/webserver/express');
const database = require('../../src/infra/database/index');

const { PlanModel } = database.databaseModels();
const { expect } = chai;
chai.use(chaiHttp);

describe('Routes: plans', () => {
  const planId = '611c4429f86c8f4346a454bb';
  const defaultPlan = {
    name: 'Some Plan',
    freeMinutes: 20,
    price: 20,
  };

  before(async () => await database.openConnection());
  after(async () => await database.closeConnection());

  beforeEach(async () => {
    await PlanModel.deleteMany();

    const plan = new PlanModel(defaultPlan);
    plan.createdAt = '2021-08-17T23:20:09.682Z';
    plan.updatedAt = '2021-08-17T23:20:09.682Z';
    plan._id = planId;
    return await plan.save();
  });

  afterEach(async () => await PlanModel.deleteMany());

  describe('GET /v1/plans', () => {
    const expectedResponse = {
      success: true,
      statusCode: 200,
      message: '',
      data: [
        {
          _id: planId,
          name: 'Some Plan',
          freeMinutes: 20,
          price: 20,
          createdAt: '2021-08-17T23:20:09.682Z',
          updatedAt: '2021-08-17T23:20:09.682Z',
          __v: 0,
        },
      ],
    };

    it('return list plans', async () => {
      const { app } = await server();
      const res = await chai
        .request(app)
        .get('/v1/plans');

      expect(res.status).to.equal(200);
      expect(res.body).to.eql(expectedResponse);
    });

    context('When not exists ddds in database', () => {
      const emptyList = {
        success: true,
        statusCode: 200,
        message: '',
        data: [],
      };

      it('return empty list', async () => {
        await PlanModel.deleteMany();
        const { app } = await server();
        const res = await chai
          .request(app)
          .get('/v1/plans');

        expect(res.status).to.equal(200);
        expect(res.body).to.eql(emptyList);
      });
    });
  });

  describe('GET /v1/plans/:id', () => {
    const expectedResponse = {
      success: true,
      statusCode: 200,
      message: '',
      data: {
        _id: planId,
        name: 'Some Plan',
        freeMinutes: 20,
        price: 20,
        createdAt: '2021-08-17T23:20:09.682Z',
        updatedAt: '2021-08-17T23:20:09.682Z',
        __v: 0,
      },
    };

    it('return list plans', async () => {
      const { app } = await server();
      const res = await chai
        .request(app)
        .get(`/v1/plans/${planId}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.eql(expectedResponse);
    });

    context('When not exists ddds in database', () => {
      const notFoundError = {
        data: { message: 'Plan not found' },
        message: 'Plan not found',
        statusCode: 404,
        success: false,
      };

      it('return not found error', async () => {
        await PlanModel.deleteMany();
        const { app } = await server();
        const res = await chai
          .request(app)
          .get(`/v1/plans/${planId}`);

        expect(res.status).to.equal(404);
        expect(res.body).to.eql(notFoundError);
      });
    });
  });
});
