const  member_api = "/api/v1/classroom/member/"
export default {
    namespaced: true,
    actions: {
        async addClassroomMember(context, params) {
            return await axios.post(`${member_api}`, params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async getListMember(context, params = null) {
            return await axios.get(`${member_api}`, params = {params})
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async getMember(context,id) {
            return await axios.get(`${member_api}${id}`, )
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async updateMember(context, params = null) {
            let id = params.id
            return await axios.put(`${member_api}${id}/`, params)
                .then((response) => {
                    context.dispatch("success/setSuccess", response.data, {root: true});
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async deleteMember(context, id) {
            return await axios.delete(`${member_api}${id}/`)
                .then((response) => {
                    context.dispatch("success/setSuccess", response.data, {root: true});
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
    }
}