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

// Routes
app.use('/api/users/', users);

mongoose.connect('mongodb://127.0.0.1:27017/gastracker', { useNewUrlParser: true });
const connection = mongoose.connection;

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

    // Listen the server
    app.listen(port, host);
        consola.ready({
            message: `Server listening on http://${host}:${port}`,
            badge: true
    });

}

start();
