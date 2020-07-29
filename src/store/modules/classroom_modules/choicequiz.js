const choice_quiz_api = '/api/v1/classroom-module/choice-quiz/choice-quiz/'
export default {
    namespaced: true,
    actions: {
        async createChoiceQuiz(context, params) {
            return await axios.post(`${choice_quiz_api}`, params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
    }
}