import Vue from 'vue'
import Vuex from 'vuex'
// local modules
import user from "./modules/core/user";
import classroom from "./modules/classroom/classroom";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user: user,
        classroom: classroom,
    }
})
