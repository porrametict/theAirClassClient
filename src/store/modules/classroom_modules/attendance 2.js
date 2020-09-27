const attendance_api = '/api/v1/classroom-module/attendance/attendance/'
const attendance_play_api = '/api/v1/classroom-module/attendance/attendance-play/'
export default {
    namespaced: true,
    actions: {
        async getAttendancePlays(context, params) {
            return await axios.get(`${attendance_play_api}`, params = {params})
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async getAttendancePlay(context, id) {
            return await axios.get(`${attendance_play_api}${id}/`)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async deleteAttendancePlay(context, id) {
            return await axios.delete(`${attendance_play_api}${id}`)
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