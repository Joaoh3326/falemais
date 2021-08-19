const express = require('express');

const router = express.Router();

const dddRoutes = require('./ddd');
const planRoutes = require('./plan');
const feeRoutes = require('./fee');

router.use('/ddds', dddRoutes);
router.use('/plans', planRoutes);
router.use('/fees', feeRoutes);

module.exports = router;
