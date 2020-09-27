const chat_image = '/api/v1/classroom-module/chat/image/'
export default {
    namespaced: true,
    actions: {
        async uploadImageMessage(context, params) {
            return await axios.post(`${chat_image}`, params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async deleteImageMessage(context, id) {
            return await axios.delete(`${chat_image}${id}/`)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
    }
}