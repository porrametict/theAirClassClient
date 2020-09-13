export default {
    path: 'poll',
    component: () => import('../../views/classroom_modules/poll/Template'),
    children: [
        {
            path: "",
            name: "PollIndex",
            component: () => import('../../views/classroom_modules/poll/Index')
        },
    ]
}
