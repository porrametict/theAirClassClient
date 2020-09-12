import choicequiz from "./choicequiz";
import attendance from "@/router/classroom_modules/attendance";

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
        attendance,
    ]
}