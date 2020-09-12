import chat from "@/store/modules/classroom_modules/chat";
import choicequiz from "@/store/modules/classroom_modules/choicequiz";
import attendance from "@/store/modules/classroom_modules/attendance";

export default {
    namespaced: true,
    modules: {
        chat: chat,
        choicequiz: choicequiz,
        attendance: attendance,

    }
}
