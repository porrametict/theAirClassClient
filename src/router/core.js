export default {
    path: '/core',
    name: 'Core',
    component: () => import('../views/MainTemplate'),
    children: [
        {
            path: "home",
            name: "Home",
            component: () => import('../views/Home')
        },
        {
            path: "profile",
            name: "Profile",
            component: () => import('../views/account/Profile')
        },
        {
            path: "classroom",
            name: "Classroom",
            component: () => import('../views/classroom/Classroom_index')
        },
        {
            path: "classroom-detail",
            name: "Classroom-detail",
            component: () => import('../views/classroom/Classroom_detail')
        },
        {
            path: "classroom-edit",
            name: "Classroom-edit",
            component: () => import('../views/classroom/Classroom_edit')
        },
        {
            path: "index-classroom",
            name: "Index_classroom",
            component: () => import('../views/setting/Index_classroom')
        },
        {
            path: "setting-member",
            name: "Setting-member",
            component: () => import('../views/setting/Setting_member')
        },
        {
            path: "classroom-join",
            name: "Classroom-join",
            component: () => import('../views/classroom/Classroom_join')
        },

    ]
}
