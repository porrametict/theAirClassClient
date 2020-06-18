export default {
    path: 'questions',
    component: () => import('../../views/classroom_modules/questions/Template'),
    children: [
        {
            path: "",
            name: "QuestionIndex",
            component: () => import('../../views/classroom_modules/questions/Index')
        },
    ]
}
