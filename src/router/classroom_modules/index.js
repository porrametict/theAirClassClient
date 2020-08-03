import screensharing from "../classroom_modules/screensharing"
import firstclassroom from "./firstclassroom";
export default {
    path: 'module',
    component: () => import('../../views/classroom_modules/Template'),
    children: [
        firstclassroom,
        screensharing,

    ]
}