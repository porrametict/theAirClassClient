export default {
    path: 'attendance',
    component: () => import('../../views/classroom_modules/attendance/Template'),
    children: [
        {
            path: "",
            name: "AttendanceIndex",
            component: () => import('../../views/classroom_modules/attendance/Index')
        },
        {
            path: ":attendance_play_id/view",
            name: "AttendanceView",
            component: () => import('../../views/classroom_modules/attendance/View')
        },
    ]
}
