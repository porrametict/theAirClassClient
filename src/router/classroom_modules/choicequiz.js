export default {
    path: 'choice-quiz',
    component: () => import('../../views/classroom_modules/choicequiz/Template'),
    children: [
        {
            path: "",
            name: "ChoiceQuizIndex",
            component: () => import('../../views/classroom_modules/choicequiz/Index')
        },
        {
            path: "create",
            name: "ChoiceQuizCreate",
            component: () => import('../../views/classroom_modules/choicequiz/Create')
        },
        {
            path: ":choice_quiz_id/edit",
            name: "ChoiceQuizEdit",
            component: () => import('../../views/classroom_modules/choicequiz/Edit')
        }, {
            path: ":choice_quiz_id/play",
            name: "ChoiceQuizPlayIndex",
            component: () => import('../../views/classroom_modules/choicequiz/PlayIndex')
        },{
            path: ":choice_quiz_play_id/play-view",
            name: "ChoiceQuizPlayView",
            component: () => import('../../views/classroom_modules/choicequiz/PlayView')
        },
    ]
}
