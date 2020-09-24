export default {
    namespaced: true,
    state: {
        success : null,
        showSuccess: false
    },
    mutations: {
        setShowSuccess(state, bool) {
            state.showSuccess = bool;
        }
    },
    actions: {
        setSuccess({state, commit}, success) {
            state.success = success
            commit('setShowSuccess', true);
            setTimeout(() => {
                commit('setShowSuccess', false)
            }, 6000)
        },
        toggleSuccess({commit}, bool) {
            commit('setShowSuccess', bool);
        }
    }

}