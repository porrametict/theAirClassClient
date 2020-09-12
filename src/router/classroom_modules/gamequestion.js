export default {
    path: 'game-question',
    component: () => import('../../views/classroom_modules/gamequestion/Template'),
    children: [
        {
            path: "",
            name: "GameQuestionIndex",
            component: () => import('../../views/classroom_modules/gamequestion/Index')
        },
    ]
}
