import chat from "@/store/modules/classroom_modules/chat";
import choicequiz from "@/store/modules/classroom_modules/choicequiz";
import attendance from "@/store/modules/classroom_modules/attendance";
import poll from "@/store/modules/classroom_modules/poll";
import gamequestion from "@/store/modules/classroom_modules/gamequestion";
import score from "@/store/modules/classroom_modules/score";

export default {
    namespaced: true,
    modules: {
        chat: chat,
        choicequiz: choicequiz,
        attendance: attendance,
        poll: poll,
        gamequestion: gamequestion,
        score: score,

    }
}
