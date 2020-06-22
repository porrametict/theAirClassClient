import screensharing from "../classroom_modules/screensharing"
export default {
    path: 'module',
    component: () => import('../../views/classroom_modules/Template'),
    children: [
        screensharing,

    ]
}