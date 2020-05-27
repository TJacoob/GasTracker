if ( process.env.NODE_ENV !== 'production')
	require('dotenv').config();


module.exports = {
    server: {
        port: process.env.PORT, // default: 3000
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
        '@nuxtjs/auth',
        'nuxt-fontawesome',
		// Docs: https://www.npmjs.com/package/@nuxtjs/localtunnel
		'@nuxtjs/localtunnel',
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '~/plugins/windowHeight.js', mode: 'client' },
        {src: '~/plugins/vuelidate'},
        {src: '~/plugins/axios', mode: 'client'},
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
        common: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        baseURL: 'http://0.0.0.0:3005',
        browserBaseURL: 'http://0.0.0.0:3005',
        proxyHeaders: true,
        credentials: false
    },
    /*
    ** Auth Options
    */
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/api/users/login', method: 'post', propertyName: 'token', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
                    logout: { url: '/api/users/logout', method: 'delete' },
                    user: { url: '/api/users/own', method: 'get', propertyName: false },
                },
                // tokenRequired: true,
                tokenType: '',
                autoFetchUser: true,
            }
        },
        redirect: {
            home: '/dashboard',
            login: '/login',
            logout: '/login',
        },
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
    /*
    ** Font Awesome Config
    */
    fontawesome: {
        imports: [
            {
                set: '@fortawesome/free-solid-svg-icons',
                icons: ['fas']
            },
        ],
    },

}
