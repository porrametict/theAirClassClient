import _ from "lodash"

export default {
    namespaced: true,
    state: {
        error: {
            errors: {},
            message: null,
        },
        showError: false,
    },
    mutations: {
        setShowError(state, bool) {
            state.showError = bool;
        }
    },
    actions: {
        setError({state, commit}, error) {
            error = _.map(error, (value, key) => {
                let x = {}
                if (!value[0]){
                    for (let k in value) {
                        x[k] = (value[k])
                    }
                }
                else if (typeof (value) === typeof ([]) ) {
                    x[key] = value[0]
                }
                else {
                    x[key] = value
                }
                return x
            });
            error = _.assign.apply(_, error)
            console.log(error)
            state.error = error;
            commit('setShowError', true);
            setTimeout(() => {
                commit('setShowError', false)
            }, 6000)
        },

        resetError({state, commit}) {
            state.error = {
                errors: {},
                message: null,
            }
            commit('setShowError', false);

        },
        toggleError({commit}, bool) {
            commit('setShowError', bool);
        }
    },
    getters: {
        getError: state => state.error,
    }
};