const express = require('express');
const bodyParser = require('body-parser');
const knex = require ('knex');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const signup = require('./controllers/signup');
const login = require('./controllers/login');
const deactivate = require('./controllers/deactivate');
const game = require('./controllers/game');

/*******************************************/

// Connect database to server
const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'test',
		database: 'my-magic-cauldron'
	}
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

/*******************************************/


app.get('/', (req, res) => {
	res.json('GET response working!');
});

app.post('/signup', (req, res) => {
	signup.handleSignUp(req, res, db, bcrypt);
});

app.post('/login', (req, res) => {
	login.handleLogIn(req, res, db, bcrypt);
})

app.put('/game', (req, res) => {
	game.handleGame(req, res, db);
});

app.delete('/deactivate', (req, res) => {
	deactivate.handleDeactivate(req, res, db);
});


/*******************************************/


app.listen(3002, () => {
	console.log('App is running on port 3002');
});