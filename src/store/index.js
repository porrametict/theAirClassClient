import Vue from 'vue'
import Vuex from 'vuex'
// local modules
import user from "./modules/core/user";
import classroom from "./modules/classroom/classroom";
import classroom_modules from "./modules/classroom_modules/classroom_modules_index";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user: user,
        classroom: classroom,
        classroom_modules: classroom_modules
    }
})
