<<<<<<< HEAD
import score from "../classroom_modules/score";
import member from "../classroom_modules/member";
import assignments from "../classroom_modules/assignments";
import questions from "../classroom_modules/questions";
import steam from "../steam/steam";

=======
import classroom_module_index from "../classroom_modules/classroom_module_index";
import module_index from '../classroom_modules/index'
>>>>>>> bce56eb2712e1c8c18fee3aba672d7074c017a4a
export default {
    path: '/classroom',
    component: () => import('../../views/classroom/Template'),
    children: [
        {
            path: "",
            name: "IndexClassroom",
            component: () => import('../../views/classroom/Index')
        },
        {
            path: ":id/board",
            name: "BoardClassroom",
            component: () => import('../../views/classroom/Board'),
        },
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
            path: ":id/edit",
            name: "EditClassroom",
            component: () => import('../../views/classroom/Edit')
        }, {
            path: ":id/main",
            name: "MainClassroom",
            component: () => import('../../views/classroom/Main'),
            children: [
                classroom_module_index
            ]
        },
<<<<<<< HEAD
        {
            path: "steam",
            name: "SteamsClassroom",
            component: () => import('../../views/steams/Index')
        },
=======
        module_index
>>>>>>> bce56eb2712e1c8c18fee3aba672d7074c017a4a
    ]
}
