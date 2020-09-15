const poll_play_api = '/api/v1/classroom-module/poll/poll-play/'
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
    }
}