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
const vehicles = require('./api/vehicles');
const refuels = require('./api/refuels');

// Routes
app.use('/api/users/', users);
app.use('/api/profiles/', profiles);
app.use('/api/vehicles/', vehicles);
app.use('/api/refuels/', refuels);

if ( process.env.NODE_ENV === 'production')
	mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
else
	mongoose.connect('mongodb://0.0.0.0:27017/gastracker', { useNewUrlParser: true });
const connection = mongoose.connection;

console.log('ENV:' + process.env.NODE_ENV + '\n');
console.log('HOST:' + process.env.HOST + '\n');
console.log('PORT:' + process.env.PORT + '\n');

connection.on('error', function(err) { console.log(err.message); });
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

async function start () {

    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    const { host, port } = nuxt.options.server;

    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build()
    } else {
        await nuxt.ready()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render);

    const _HOST = process.env.HOST || host;
	const _PORT = process.env.PORT || port;

    // Listen the server
    app.listen(_PORT, _HOST);
        consola.ready({
            message: `Server listening on http://${_HOST}:${_PORT}`,
            badge: true
    });

}

start();
