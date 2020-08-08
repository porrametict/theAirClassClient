const choice_quiz_api = '/api/v1/classroom-module/choice-quiz/choice-quiz/'
export default {
    namespaced: true,
    actions: {
        async getChoiceQuizzes(context, params) {
            return await axios.get(`${choice_quiz_api}`, params={params})
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async getChoiceQuiz(context,id){
            return await axios.get(`${choice_quiz_api}${id}/`)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async createChoiceQuiz(context, params) {
            return await axios.post(`${choice_quiz_api}`, params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async updateChoiceQuiz(context, params) {
            let id = params.id
            return await axios.put(`${choice_quiz_api}${id}/`, params)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
        async deleteChoiceQuiz(context,id){
            return await axios.delete(`${choice_quiz_api}${id}/`)
                .then((response) => {
                    return response.data
                }).catch((error) => {
                    console.error(error)
                    return null
                })
        },
    }
}