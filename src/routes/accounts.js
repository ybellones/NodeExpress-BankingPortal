const express = require('express');
const router = express.Router();

const { accounts } = require('../data');

//savings route
router.get('/savings', (req, res) => res.render('account', {account:accounts.savings}));

//checking route
router.get('/checking', (req, res) => res.render('account', {account: accounts.checking}));

//credit route
router.get('/credit', (req, res) => res.render('account', {account: accounts.credit}));

module.exports = router;