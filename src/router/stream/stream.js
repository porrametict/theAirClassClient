export default {
    path: '/stream',
    component: () => import('../../views/stream/Template'),
    children: [
        {
            path: "client",
            name: "ClientIndex",
            component: () => import('../../views/stream/Client')
        },
        {
            path: "server",
            name: "ServerIndex",
            component: () => import('../../views/stream/Server')
        },
    ]
}