/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/infra/webserver/express');
const database = require('../../src/infra/database/index');

const { DDDModel } = database.databaseModels();
const { expect } = chai;
chai.use(chaiHttp);

describe('Routes: ddss', () => {
  const defaultDdd = {
    regionName: 'Some Region',
    ddd: '020',
  };

  const expectedResponse = {
    success: true,
    statusCode: 200,
    message: '',
    data: [
      {
        _id: '56cb91bdc3464f14678934ca',
        regionName: 'Some Region',
        ddd: '020',
        createdAt: '2021-08-18T02:53:58.632Z',
        updatedAt: '2021-08-18T02:53:58.632Z',
        __v: 0,
      },
    ],
  };

  before(async () => await database.openConnection());
  after(async () => await database.closeConnection());

  beforeEach(async () => {
    await DDDModel.deleteMany();

    const ddd = new DDDModel(defaultDdd);
    ddd.createdAt = '2021-08-18T02:53:58.632Z';
    ddd.updatedAt = '2021-08-18T02:53:58.632Z';
    ddd._id = '56cb91bdc3464f14678934ca';
    return await ddd.save();
  });

  afterEach(async () => await DDDModel.deleteMany());

  describe('GET /v1/ddds', () => {
    it('return list ddds', async () => {
      const { app } = await server();
      const res = await chai
        .request(app)
        .get('/v1/ddds');
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
        await DDDModel.deleteMany();
        const { app } = await server();
        const res = await chai
          .request(app)
          .get('/v1/ddds');

        expect(res.status).to.equal(200);
        expect(res.body).to.eql(emptyList);
      });
    });
  });
});
