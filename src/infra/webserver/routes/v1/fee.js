const express = require('express');
const FeeService = require('../../../../factories/feeFactory');

const router = express.Router();
const feeService = FeeService.generateInstance();

router.get('/', async (req, res, next) => {
  const { query } = req;
  try {
    const fee = await feeService.findOne(query);
    res.status(200).send(fee);
  } catch (error) {
    next(error);
  }
});

router.get('/calculateFees', async (req, res, next) => {
  const { query } = req;
  try {
    const fee = await feeService.calculateFees(query);
    res.status(200).send(fee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
