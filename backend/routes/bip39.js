// routes/index.js
const express = require('express');
const router = express.Router({mergeParams: true});;

const { generateMnemonic } = require('../controllers/bip39Controller');

router.post('/mnemonic', generateMnemonic);

module.exports = router;