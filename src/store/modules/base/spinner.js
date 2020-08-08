export default {
    namespaced: true,
    state: {
        visible: false,
    },
    mutations: {
        updateVisible(state,value) {
            state.visible = value;
        }
    },
    actions: {
        toggle({state,commit}, bool = null) {
            if(bool == null){
                bool = !state.visible;
            }
            commit('updateVisible',bool)
        }
    },
    getters: {
        getVisible: state => state.visible
    }
};