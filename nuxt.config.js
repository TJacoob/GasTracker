require('dotenv').config();

module.exports = {
    server: {
        port: 3000, // default: 3000
        host: '0.0.0.0' // default: localhost
    },
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,700&display=swap'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
        '~/assets/scss/app.scss'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '~/plugins/windowHeight.js', mode: 'client' },
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        // https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://bootstrap-vue.js.org
         'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
    ],
    bootstrapVue: {
        bootstrapCSS: false,
        bootstrapVueCSS: false
    },
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {
        },
        serverMiddleware: [
            // API middleware
            '~/server/index.js'
        ],
    },
}
