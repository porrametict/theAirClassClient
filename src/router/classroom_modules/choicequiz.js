export default {
    path: ':classroom_module/choice-quiz',
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
        },
    ]
}
