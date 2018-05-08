const express = require('express');
const morgan = require('morgan');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const db = require('./db/models');

// sequelize configuration
db.sequelize.sync();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/authors', require('./db/routes/authors'));
app.use('/api/blogs', require('./db/routes/blogs'));

app.get('/', (req, res) => {
    res.status(200).send();
});

module.exports = app;