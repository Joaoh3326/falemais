const express = require('express');

const router = express.Router();

const PlanService = require('../../factories/planFactory');

const planService = PlanService.generateInstance();

router.get('/', async (req, res, next) => {
  try {
    const response = await planService.findAll();

    res.status(response.statusCode).send(response);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await planService.findById(id);
    res.status(response.statusCode).send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
