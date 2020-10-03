const score_api = '/api/v1/classroom-module/score/score/'
export default {
    namespaced: true,
    actions: {
        async getScores(context, params) {
            return await axios.get(`${score_api}`, params = {params})
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async getScore(context, id) {
            return await axios.get(`${score_api}${id}/`)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async deleteScore(context, id) {
            return await axios.delete(`${score_api}${id}/`)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
    }
}