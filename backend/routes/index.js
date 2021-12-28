// routes/index.js
const express = require('express');
const router = express.Router({mergeParams: true});

const { firstRequest,generateMnemonic } = require('../controllers/controller');

// router.get('/api', firstRequest);
router.post('/mnemonic', generateMnemonic);

router.use('/bip39', require('./bip39'));

module.exports = router;