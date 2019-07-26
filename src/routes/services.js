const express = require('express');
const router = express.Router();

const { accounts, writeJSON } = require('../data');

//transfer route
router.get('/transfer', (req,res) => res.render('transfer'));

//payment GET route
router.get('/payment', (req, res) => res.render('payment', {account: accounts.credit}));

//******************************************************************************************************* */

//transfer POST route
router.post('/transfer', (req, res) => {
    //deduct balance FROM
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;

    //ADD balance to other account
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance, 10) + parseInt(req.body.amount,10);

    writeJSON();
    res.render('transfer', {message: "Transfer Completed"});
});

router.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount,10);
    
    writeJSON();
    res.render('payment', {message: "Payment Successful", account: accounts.credit});
});

module.exports = router;