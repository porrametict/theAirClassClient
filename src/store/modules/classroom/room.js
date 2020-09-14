const room_api = "/api/v1/classroom/room/"

export default {
    namespaced: true,
    actions: {
        async getRooms(context, params) {
            return await axios.post(`${room_api}`, params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },

        async createRoom(context, params) {
            return await axios.post(`${room_api}`, params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async getRoom(context, id) {
            return await axios.get(`${room_api}${id}`,)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async updateRoom(context, params) {
            return await axios.put(`${room_api}${params.id}/`, params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
    }
}