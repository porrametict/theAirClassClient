import firstclassroom from "../classroom_modules/firstclassroom"

export default {
    path: 'module',
    component: () => import('../../views/classroom_modules/firstclassroom/Template'),
    children: [
        firstclassroom,
    ]
}