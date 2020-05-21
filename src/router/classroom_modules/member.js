export default {
    path: 'member',
    component: () => import('../../views/classroom_modules/member/Template'),
    children: [
        {
            path: "",
            name: "MemberIndex",
            component: () => import('../../views/classroom_modules/member/Index')
        },
    ]
}
