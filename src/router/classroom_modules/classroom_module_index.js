import choicequiz from "./choicequiz";

export default {
    path: 'classroom-module',
    component: () => import('../../views/classroom_modules/Template'),
    children: [
        {
            path: '',
            name: 'ClassroomModuleIndex',
            component: () => import('../../views/classroom_modules/Index')
        },
        choicequiz,
    ]
}