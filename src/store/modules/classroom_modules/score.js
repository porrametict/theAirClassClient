const score_api = '/api/v1/classroom-module/score/score/'
const score_export_api = '/api/v1/classroom-module/score/export/'
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
        async exportScore(context, params) {
            return await axios.get(`${score_export_api}${params.id}/`)
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