import score from "../classroom_modules/score";
import member from "../classroom_modules/member";

export default {
    path: '/classroom',
    component: () => import('../../views/classroom/Template'),
    children: [
        {
            path: "create",
            name: "CreateClassroom",
            component: () => import('../../views/classroom/Create')
        }, {
            path: "join",
            name: "JoinClassroom",
            component: () => import('../../views/classroom/Join')
        },
        {
            path: "EditClassroom",
            name: "Edit",
            component: () => import('../../views/classroom/Edit')
        }, {
            path: "main",
            name: "MainClassroom",
            component: () => import('../../views/classroom/Main'),
            children: [
                score,
                member
            ]
        },
    ]
}