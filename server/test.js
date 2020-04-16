const express = require('express');
const consola = require('consola');
const mongoose = require('mongoose');
const { Nuxt, Builder } = require('nuxt');
const app = express();

// Body Parser
const bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

// Express Specific Configurations
require('./config/index.js');

// Import Routes
const users = require('./api/users');
const profiles = require('./api/profiles');

// Routes
app.use('/api/users/', users);
app.use('/api/profiles/', profiles);

module.exports = app;
