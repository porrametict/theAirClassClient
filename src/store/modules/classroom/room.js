const room_api = "/api/v1/classroom/room/"

export default {
    namespaced: true,
    actions: {
        async createRoom(context, params) {
            return await axios.post(`${room_api}`, params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async getRoom(context, id) {
            return await axios.get(`${room_api}${id}`, )
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
    }
}