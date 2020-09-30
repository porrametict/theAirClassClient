export default {
    path: '/user',
    component: () => import('../../views/core/user/Template'),
    children: [
        {
            path: "",
            redirect: {name: 'EditProfile'},
            name: "Profile",
            component: () => import('../../views/core/user/Profile')
        },
        {
            path: "edit-profile",
            name: "EditProfile",
            component: () => import('../../views/core/user/EditProfile')
        },
    ]
}
