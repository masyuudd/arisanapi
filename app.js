const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
process.env.SECRET_KEY = "arisan";

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Auth = require('./app/routes/auth');
Auth(app);

const Users = require('./app/routes/users');
Users(app);

// var Users = require('./app/routes/users');

// app.use('/xx',Users);

app.listen(port, () => console.log(`Lintening on Port ${port} ...`));
