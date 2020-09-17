export default {
    path: 'game-question',
    component: () => import('../../views/classroom_modules/gamequestion/Template'),
    children: [
        {
            path: "",
            name: "GameQuestionIndex",
            component: () => import('../../views/classroom_modules/gamequestion/Index')
        }, {
            path: ":game_question_play_id/view",
            name: "GameQuestionView",
            component: () => import('../../views/classroom_modules/gamequestion/View')
        },
    ]
}
