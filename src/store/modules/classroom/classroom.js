const classroom_api = "/api/v1/classroom/classroom/"
const member_lof_api = "/api/v1/classroom/member-lof/"
import room from "./room";
import member from "@/store/modules/classroom/member";

export default {
    namespaced: true,
    state: {
        classroom: null,
    },
    mutations: {
        setClassroom(state, data) {
            state.classroom = data
        }
    },
    actions: {
        jsonToFormData(context, params) {
            const fd = new FormData();

            for (let key in params) {
                fd.append(key, params[key]);
            }
            fd.delete('image') // this field not valid
            if (params.image) {
                fd.append('image', params.image, params.image.name)
            }
            return fd
        },
        async createClassroom(context, params) {
            let fd = await context.dispatch('jsonToFormData', params)
            return await axios.post(`${classroom_api}`, fd)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async getListClassroom(context, params = null) {
            return await axios.get(`${classroom_api}`, params = {params})
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async getListClassroomByUser(context, params = null) {
            return await axios.get(`${member_lof_api}`, params = {params})
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async retrieveClassroom(context, id) {
            return await axios.get(`${classroom_api}${id}/`)
                .then((response) => {
                    context.commit('setClassroom', response.data)
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async updateClassroom(context, params) {
            let id = params.id
            let fd = await context.dispatch('jsonToFormData', params)
            return await axios.put(`${classroom_api}${id}/`, fd)
                .then((response) => {
                    context.commit('setClassroom', response.data)
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async deleteClassroom(context, id) {
            return await axios.delete(`${classroom_api}${id}/`)
                .then((response) => {
                    return true  // 204 No Content
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },


    },
    modules: {
        room: room,
        member : member,
    }
}