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
        }
    ]
}
