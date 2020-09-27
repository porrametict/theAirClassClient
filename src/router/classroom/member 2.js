export default {
    path: 'member',
    component: () => import('../../views/classroom/member/Template'),
    children: [
        {
            path: "",
            name: "MemberIndex",
            component: () => import('../../views/classroom/member/Index')
        },
    ]
}
