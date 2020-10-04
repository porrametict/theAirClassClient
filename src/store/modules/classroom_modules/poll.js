const poll_play_api = '/api/v1/classroom-module/poll/poll-play/'
const poll_play_export_api = '/api/v1/classroom-module/poll/poll-play/export/'
export default {
    namespaced: true,
    actions: {
        async getPollPlays(context, params) {
            return await axios.get(`${poll_play_api}`, params = {params})
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        }, async getPollPlay(context, id) {
            return await axios.get(`${poll_play_api}${id}/`,)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        }, async deletePollPlay(context, id) {
            return await axios.delete(`${poll_play_api}${id}/`,)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async exportPollPlay(context, params) {
            return await axios.get(`${poll_play_export_api}${params.id}/`)
                .then((response) => {
                    loadCSVFile(response.data, params.file_name)
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
    }
}