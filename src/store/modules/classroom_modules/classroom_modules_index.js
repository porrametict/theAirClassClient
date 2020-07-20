import member from "./member";
import chat from "./chat"

export default {
    namespaced: true,
    modules: {
        member: member,
        chat: chat,
    }
}
