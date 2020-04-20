const qs = require('querystring');

export const state = () => ({
    authUser: null
})

export const mutations = {
    SET_USER (state, user) {
        state.authUser = {username:user.username, token:user.token};
        //localStorage.setItem('authUser', JSON.stringify(state.authUser));
        // TODO: Persist state
        this.$axios.defaults.headers.common['x-access-token'] = user.token;
    }
}

export const actions = {
    async register ({ commit }, credentials) {
        try {
            await this.$axios.post('/api/users/create', qs.stringify(credentials), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
                .then((res) => {
                    if (res.status === 200 && res.data.success) {
                        commit('SET_USER', res.data);
                    }
                })
        } catch (error) {
            if (error.response) {
                throw new Error(error.response)
            }
            throw error
        }
    },
    async login ({ commit }, credentials) {
        try {
            await this.$axios.post('/api/users/login', qs.stringify(credentials), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
                .then((res) => {
                    if (res.status === 200 && res.data.success) {
                        commit('SET_USER', res.data);
                    }
                })
        } catch (error) {
            if (error.response) {
                throw new Error(error.response)
            }
            throw error
        }
    },

    /*
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit ({ commit }, { req }) {
        if (req.session && req.session.authUser) {
            commit('SET_USER', req.session.authUser)
        }
    },
    async login ({ commit }, { username, password }) {
        try {
            const { data } = await axios.post('/api/login', { username, password })
            commit('SET_USER', data)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('Bad credentials')
            }
            throw error
        }
    },

    async logout ({ commit }) {
        await axios.post('/api/logout')
        commit('SET_USER', null)
    }
    */
}

export const getters = {
    loggedIn (state) {
        return !!state.authUser;
    }
}
