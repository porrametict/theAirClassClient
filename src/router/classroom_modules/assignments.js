export default {
    path: 'assignments',
    component: () => import('../../views/classroom_modules/assignments/Template'),
    children: [
        {
            path: "",
            name: "AssignmentsIndex",
            component: () => import('../../views/classroom_modules/assignments/Index')
        },
    ]
}
