import Peer from 'peerjs'

export default {
    namespaced: true,
    state: {
        my_peer: null,
        sharescreenState: {},
        shareScreenActive : false
    },
    mutations: {
        set_my_peer(state, data) {
            state.my_peer = data
        },
        set_sharescreenState(state, data) {
            state.sharescreenState = data
        },
        set_share_screen_active(state,data){
            state.shareScreenActive = data
        }

    },
    actions: {
        async createPeer(context,) {
            let my_peer = await new Peer()
            context.commit('set_my_peer', my_peer)
            return my_peer

        },
        async getMyPeer(context,) {
            let my_peer = context.state.my_peer
            if (!my_peer) {
                my_peer = await context.dispatch('createPeer')
            }
            return my_peer
        },
        async setSharescreenState(context,state) {
            context.commit('set_sharescreenState', state)
            return state

        },
    }

}