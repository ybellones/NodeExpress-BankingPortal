const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(3000, () => console.log('My project is running on port 3000!'));