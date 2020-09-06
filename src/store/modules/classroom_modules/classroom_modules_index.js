import classroom_module from "./classroom_module";
import chat from "./chat"
import choicequiz from "./choicequiz";

export default {
    namespaced: true,
    modules: {
        classroom_module: classroom_module,
        chat: chat,
        choicequiz: choicequiz,
    }
}
