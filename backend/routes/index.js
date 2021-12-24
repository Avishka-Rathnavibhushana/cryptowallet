// routes/index.js
const express = require('express');
const router = express.Router();

const { firstRequest } = require('../controllers/controller');

router.get('/api', firstRequest);

module.exports = router;