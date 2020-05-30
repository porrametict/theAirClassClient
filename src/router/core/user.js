export default {
    path: '/user',
    component: () => import('../../views/core/user/Template'),
    children: [
        {
            path: "profile",
            name: "Profile",
            component: () => import('../../views/core/user/Profile')
        },
        {
            path: "edit-profile",
            name: "EditProfile",
            component: () => import('../../views/core/user/EditProfile')
        },
        {
            path: "edit-password",
            name: "EditPassword",
            component: () => import('../../views/core/user/EditPassword')
        },
    ]
}
