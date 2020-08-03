export default {
    path: 'firstclassroom',
    component: () => import('../../views/classroom_modules/firstclassroom/Template'),
    children: [
        {
            path: "",
            name: "FirstClassroomIndex",
            component: () => import('../../views/classroom_modules/firstclassroom/firstclassroom')
        },
    ]
}