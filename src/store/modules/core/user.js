// context.dispatch("success/setSuccess", response.data, {root: true});
// context.dispatch("error/setError", error.response.data, {root: true});
export default {
    namespaced: true,
    state: {
        user: null
    },
    mutations: {
        setUser: function (state, data) {
            state.user = data
        },
        setUserProfile: function (state, data) {
            state.user.profile = data
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
                    context.dispatch("error/setError", error.response.data, {root: true});
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
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },

        registerUser: async function (context, params) {
            localStorage.clear()  // clear old access_token because it invalid token if send request with token
            return await axios.post(`/rest-auth/registration/`, params)
                .then((response) => {
                    context.dispatch("success/setSuccess", response.data, {root: true})
                    return response.data
                })
                .catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
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
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async uploadProfileImage(context, params) {
            const fd = new FormData();
            fd.append('image', params.image, params.image.name)
            fd.append('user', params.user)

            return await axios.post('/api/v1/core/user-profile/', fd)
                .then((response) => {
                    context.dispatch("success/setSuccess", response.data, {root: true})
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async updateProfileImage(context, params) {
            let id = params.id
            const fd = new FormData();
            fd.append('image', params.image, params.image.name)
            fd.append('user', params.user)

            return await axios.put(`/api/v1/core/user-profile/${id}/`, fd)
                .then((response) => {
                    context.dispatch("success/setSuccess", response.data, {root: true})
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async updateUser(context, params) {
            if (params.profile) { // we don't send profile_date to server for now because l lazy to manage image_profile .
                //In Current data ,we sent ImageURL but server need  ImageFile .
                delete params.profile  // if you want to update profile , you must update serializer and viewSet on server-side for Ignore Image_data.
            }
            let id = params.id
            return await axios.put('/rest-auth/user/', params)
                .then((response) => {
                    context.commit('setUser', response.data)
                    context.dispatch("success/setSuccess", response.data, {root: true})
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async changePassword(context, params) {

            return await axios.post('/rest-auth/password/change/', params)
                .then((response) => {
                    context.dispatch("success/setSuccess", response.data, {root: true})
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        }

    },

}