export default {
    namespaced: true,
    state: {
        user: null
    },
    mutations: {
        setUser: function (state, data) {
            state.user = data
        }
    },
    actions: {
        getUserToken: async function (context, params) {
            // clear old access_token
            delete axios.defaults.headers.common["Authorization"];
            localStorage.clear()

            let data = await axios.post(`/rest-auth/login/`, params)
                .then((response) => {
                    // console.log("response", response.data)
                    localStorage.setItem('access_token', response.data.key)
                    axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('access_token')}`;
                    return response.data
                })
                .catch((error) => {
                    console.error(error)
                    return null
                })
            return data
        },
        getUser: async function (context, params) {
            return await axios.get(`/rest-auth/user/`)
                .then((response) => {
                    context.commit('setUser', response.data)
                    return response.data
                })
                .catch((error) => {
                    console.error(error)
                    return null
                })
        },

        registerUser: async function (context, params) {
            localStorage.clear()  // clear old access_token because it invalid token if send request with token
            return await axios.post(`/rest-auth/registration/`, params)
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async logout(context) {
            return await axios.post(`/rest-auth/logout/`)
                .then((response) => {
                    // console.log("response", response.data)
                    delete axios.defaults.headers.common["Authorization"];
                    localStorage.clear()
                    return response.data
                })
                .catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async uploadProfileImage(context, params) {
            const fd = new FormData();
            fd.append('image', params.image, params.image.name)
            fd.append('user', params.user)

            return await axios.post('/api/v1/core/user-profile/', fd)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        }
    },
    modules: {}
}