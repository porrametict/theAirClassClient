import chat from "@/store/modules/classroom_modules/chat";
import choicequiz from "@/store/modules/classroom_modules/choicequiz";
import attendance from "@/store/modules/classroom_modules/attendance";
import poll from "@/store/modules/classroom_modules/poll";

export default {
    namespaced: true,
    modules: {
        chat: chat,
        choicequiz: choicequiz,
        attendance: attendance,
        poll: poll,

    }
}
