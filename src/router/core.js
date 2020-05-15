export default {
    path: '/core',
    name: 'Core',
    component: () => import('../views/MainTemplate'),
    children: [
        {
            path: "home",
            name: "Home",
            component: () => import('../views/Home')
        }
    ]
}