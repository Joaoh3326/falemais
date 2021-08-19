/* eslint-disable consistent-return */
const express = require('express');

const router = express.Router();

const DDDService = require('../../../../factories/dddFactory');

const dddService = DDDService.generateInstance();

router.get('/', async (req, res, next) => {
  try {
    const response = await dddService.findAll();

    return res.status(response.statusCode).send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
