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
        logout(context) {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.clear()
        },
    },
    modules: {}
}