// Unused, replaced by Nuxt suited version of the same package
//const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
//dotenv.config();

if ( process.env.NODE_ENV === 'development' )
    console.log("Configuration File Loaded");
