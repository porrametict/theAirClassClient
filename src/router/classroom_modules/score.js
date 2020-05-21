export default {
    path: 'score',
    component: () => import('../../views/classroom_modules/score/Template'),
    children: [
        {
            path: "",
            name: "ScoreIndex",
            component: () => import('../../views/classroom_modules/score/Index')
        },
    ]
}
