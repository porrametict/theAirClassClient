export default {
    namespaced: true,
    actions: {
        async uploadImageMessage(context, params) {
            return await axios.post('/api/v1/classroom-module/chat/image/', params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async deleteImageMessage(context, id) {
            return await axios.delete('/api/v1/classroom-module/chat/image/'+id+'/')
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
    }
}