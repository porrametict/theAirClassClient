export default {
    namespaced: true,
    actions: {
        async addClassroomMember(context, params) {
            return await axios.post('/api/v1/classroom-module/member/', params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        }
    }
}