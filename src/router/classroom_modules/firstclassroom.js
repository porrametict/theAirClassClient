export default {
    path: 'firstclassroom',
    component: () => import('../../views/classroom_modules/firstclassroom/Template'),
    children: [
        {
            path: "",
            name: "firstclassroom",
            component: () => import('../../views/classroom_modules/firstclassroom/firstclassroom')
        },
        {
            path: "secondclassroom",
            name: "SecondClassroomIndex",
            component: () => import('../../views/classroom_modules/firstclassroom/secondclassroom')
        },

    ]
}