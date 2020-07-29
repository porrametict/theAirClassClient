import classroom_module from "./classroom_module";
import member from "./member";
import chat from "./chat"
import choicequiz from "./choicequiz";

export default {
    namespaced: true,
    modules: {
        classroom_module: classroom_module,
        member: member,
        chat: chat,
        choicequiz: choicequiz,
    }
}
