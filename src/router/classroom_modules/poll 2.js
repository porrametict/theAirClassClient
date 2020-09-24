export default {
    path: 'poll',
    component: () => import('../../views/classroom_modules/poll/Template'),
    children: [
        {
            path: "",
            name: "PollIndex",
            component: () => import('../../views/classroom_modules/poll/Index')
        }, {
            path: ":poll_play_id",
            name: "PollView",
            component: () => import('../../views/classroom_modules/poll/View')
        },
    ]
}
