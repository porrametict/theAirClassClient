import Peer from 'peerjs'

export default {
    namespaced: true,
    state: {
        my_peer: null
    },
    mutations: {
        set_my_peer(state, data) {
            state.my_peer = data
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
        }
    }

}