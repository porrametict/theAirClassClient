
export default {
    path: '/steam',
    component: () => import('../../views/steams/Template'),
    children: [
        {
            path: "",
            name: "SteamsIndex",
            component: () => import('../../views/steams/Index')
        },

    ],
}

