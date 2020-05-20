import Login from "../views/Login";
import ProfileSettings from "../views/account/ProfileSettings";

export default {
    path: '/core',
    name: 'Core',
    component: () => import('../views/MainTemplate'),
    children: [
        {
            path: "/home",
            name: "Home",
            component: () => import('../views/Home')
        },
        {
            path: "/profileSettings",
            name: "ProfileSettings",
            component: ProfileSettings
        },
    ]
}
