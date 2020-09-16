import classroom_module_index from "../classroom_modules/classroom_module_index";
import member from "@/router/classroom/member";
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
            component: () => import('../../views/classroom/Board')
        },
        {
            path: ":id/room/:room_id",
            name: "RoomClassroom",
            component: () => import('../../views/classroom/Room')
        },
        {
            path: ":id/roomjoin",
            name: "RoomJoin",
            component: () => import('../../views/classroom/RoomJoin')
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
                member,
                classroom_module_index
            ]
        },
    ]
}
