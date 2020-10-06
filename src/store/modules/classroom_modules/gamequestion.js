const game_question_play_api = '/api/v1/classroom-module/game-question/game-question-play/'
const game_question_play_export_api = '/api/v1/classroom-module/game-question/game-question-play/export/'
export default {
    namespaced: true,
    actions: {
        async getGameQuestionPlays(context, params) {
            return await axios.get(`${game_question_play_api}`, params = {params})
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async getGameQuestionPlay(context, id) {
            return await axios.get(`${game_question_play_api}${id}/`,)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async deleteGameQuestionPlay(context, id) {
            return await axios.delete(`${game_question_play_api}${id}/`,)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    context.dispatch("error/setError", error.response.data, {root: true});
                    return null
                })
        },
        async exportGameQuestionPlay(context, params) {
            return await axios.get(`${game_question_play_export_api}${params.id}/`)
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