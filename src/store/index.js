import Vue from 'vue'
import Vuex from 'vuex'
// local modules
import user from "./modules/core/user";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user: user,
    }
})
