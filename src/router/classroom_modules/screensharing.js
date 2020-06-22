export default {
    path: 'screensharing',
    component: () => import('../../views/classroom_modules/screensharing/Template'),
    children: [
        {
            path: "",
            name: "ScreenSharingIndex",
            component: () => import('../../views/classroom_modules/screensharing/index')
        },
    ]
}
