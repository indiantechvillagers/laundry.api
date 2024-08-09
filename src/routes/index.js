const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');
const customerRoutes = require('./customerRoutes');

router.use('/admin', adminRoutes);
router.use('/customer', customerRoutes);

module.exports = router;