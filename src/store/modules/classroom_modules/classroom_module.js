const classroom_module_api = '/api/v1/classroom-module/classroom-module/'
export default {
    namespaced: true,
    actions: {
        async getListClassroomModule(context, params = null) {
            return await axios.get(`${classroom_module_api}`, params = {params})
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
    }
}