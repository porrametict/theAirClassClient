import user from './user'
import classroom from "../classroom/classroom";

export default {
    path: '',
    component: () => import('../../views/core/MainTemplate'),
    children: [
        {
            path: "home",
            name: "Home",
            component: () => import('../../views/core/Home')
        },
        user,
        classroom
    ]
}
