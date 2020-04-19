const qs = require('querystring')

export const state = () => ({
    authUser: null;
})

export const mutations = {
    SET_USER (state, user) {
        state.authUser = user;
    }
}

export const actions = {
    async register ({ commit }, credentials) {
        try {
            await this.$axios.post('/api/users/create', qs.stringify(credentials), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        commit('SET_USER', res.data)
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
    register({commit}, credentials){
        return axios.post('/api/users/create', credentials).then(({data})=>{
            console.log(data);
        })
    }
    */
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
