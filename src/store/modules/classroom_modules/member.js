export default {
    namespaced: true,
    actions: {
        async addClassroomMember(context, params) {
            return await axios.post('/api/v1/classroom-module/member/main/', params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async getListMember(context, params = null) {
            return await axios.get('/api/v1/classroom-module/member/main/', params = {params})
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async updateMember(context, params = null) {
            let id = params.id
            return await axios.put(`/api/v1/classroom-module/member/main/${id}/`, params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async deleteMember(context, id) {
            return await axios.delete(`/api/v1/classroom-module/member/main/${id}/`)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
    }
}