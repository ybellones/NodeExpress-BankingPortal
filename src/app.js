const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

//Read accounts.json file
const accountData = fs.readFileSync(path.join(__dirname,'json','accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

//Read users.json file
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');
const users = JSON.parse(userData);

app.get('/', (req, res) => res.render('index', {title:'Account Summary', accounts}));

//savings route
app.get('/savings', (req, res) => res.render('account', {account:accounts.savings}));

//checking route
app.get('/checking', (req, res) => res.render('account', {account: accounts.checking}));

//credit route
app.get('/credit', (req, res) => res.render('account', {account: accounts.credit}));

//profile route
app.get('/profile', (req,res) => res.render('profile', {user: users[0]}));

//transfer route
app.get('/transfer', (req,res) => res.render('transfer'));

//payment GET route
app.get('/payment', (req, res) => res.render('payment', {account: accounts.credit}));

//******************************************************************************************************* */

//transfer POST route
app.post('/transfer', (req, res) => {
    //deduct balance FROM
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;

    //ADD balance to other account
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance, 10) + parseInt(req.body.amount,10);

    const accountsJSON = JSON.stringify(accounts,null,4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

    res.render('transfer', {message: "Transfer Completed"});
});

app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount,10);
    
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

    res.render('payment', {message: "Payment Successful", account: accounts.credit});
});

app.listen(3000, () => console.log('My project is running on port 3000!'));