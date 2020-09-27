<template>
  <div class="d-flex ml-2" v-if="state">
    <video :src-object.prop.camel="mySharescreen" width="100px" height="100" autoplay controls></video>
    <video :src-object.prop.camel="remoteVideo" width="100px" height="100" autoplay controls></video>
    <v-btn @click="sharescreen" :disabled="!!state.host">
      <span>Share Screen</span>
      <v-icon>mdi-laptop</v-icon>
    </v-btn>
    <v-btn @click="exit_sharescreen" :disabled="!state.host || state.host.pk !== user.pk">
      <span>Disconnect Share Screen</span>
      <v-icon>mdi-laptop</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Peer from 'peerjs';
import {mapState} from "vuex";

export const createEmptyAudioTrack = () => {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const dst = oscillator.connect(ctx.createMediaStreamDestination());
  oscillator.start();
  const track = dst.stream.getAudioTracks()[0];
  return Object.assign(track, {enabled: false});
};

export const createEmptyVideoTrack = ({width, height}) => {
  const canvas = Object.assign(document.createElement("canvas"), {
    width,
    height,
  });
  canvas.getContext("2d").fillRect(0, 0, width, height);

  const stream = canvas.captureStream();
  const track = stream.getVideoTracks()[0];

  return Object.assign(track, {enabled: false});
};

export default {
  name: "ShareScreen",
  props: {
    room: {
      type: Object,
      require: true
    }
  },
  data: () => ({
    my_role: null,
    room_socket: null,
    member: [],
    myPeer: null,
    peers: {},
    mySharescreen: null,
    myEmptyVideo: null,
    remoteVideo: null,
    state: null,
  }),
  async mounted() {
    await this.getEmptyVideo()
    this.newWebSocket()
    await this.newPeer()
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    // share screen
    async getMySharescreen() {
      this.mySharescreen = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      return this.mySharescreen
    },
    async getEmptyVideo() {
      let audioTrack = createEmptyAudioTrack();
      let videoTrack = createEmptyVideoTrack({width: 1, height: 1});
      this.myEmptyVideo = new MediaStream([audioTrack, videoTrack]);
    },

    // Peer
    async newPeer() {
      this.myPeer = new Peer()
      this.myPeer.on('open', id => {
        console.log('my peer on share screen', id)
        this.join_room(id)
      })
      this.myPeer.on('call', async call => {
        call.answer(this.myEmptyVideo);
        call.on('stream', userVideoStream => {
          this.remoteVideo = userVideoStream
        })
        call.on('close', (e) => {
          console.log('new Peer call close', call['peer'])
          this.exit_sharescreen()  // host disconnect
        })
        this.peers[call['peer']] = call
      })
    },
    connectToUsers(member) {
      member.forEach((e) => {
        let peer_id = e['peer_id']
        if (peer_id !== this.myPeer.id) { // not connect to my self
          if (!this.peers[peer_id]) {
            this.connectToNewUser((e['peer_id']))
          }
        }
      })
    },
    async connectToNewUser(userId) {
      if (this.mySharescreen) {
        const call = this.myPeer.call(userId, this.mySharescreen)
        console.log('connect new', userId)
        call.on('stream', userVideoStream => {
          // pass
        })
        call.on('close', (e) => {
          console.log('call close in connect', call['peer'])
        })
        this.peers[userId] = call
      }

    },
    disconnectAllUser() {
      for (const [key, value] of Object.entries(this.peers)) {
        this.peers[key].close()
      }
      this.peers = {}
    },
    disconnectToUser(peer_id) {
      if (this.peers[peer_id]) {
        this.peers[peer_id].close()
        delete this.peers[peer_id]
      }
    },
    // Main WebSocket
    newWebSocket() {
      let self = this
      this.room_socket = new WebSocket(
          `${window.baseWsURL}/share-screen-room/${self.room.room_code}/`
      )
      this.room_socket.onopen = function () {
        self.get_current_state()
      }
      this.room_socket.onclose = function (e) {
        if (e.code !== 1000) {
          console.log('Web RT Room socket closed', e);
        }
      }
      let commands = {
        'on_sharescreen': self.on_sharescreen,
        'on_member_join': self.on_member_join,
        'on_member_leave': self.on_member_leave,
        'on_get_current_state': self.on_get_current_state,
        'on_exit_sharescreen': self.on_exit_sharescreen,
      }
      this.room_socket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let command = data['command']
        commands[command](data)
      }
    },
    socket_send(data) {
      this.room_socket.send(JSON.stringify(data));
    },
    // WebSocket functions
    join_room(id) {
      let content = {
        "command": "member_join",
        "data": {
          "peer_id": id,
          "user": this.user,
          "classroom": this.room.classroom
        }
      }
      this.socket_send(content);
    },
    async sharescreen() {
      await this.getMySharescreen()
      let content = {
        "command": "sharescreen",
        "data": {
          "peer_id": this.myPeer.id,
          "user": this.user,
        }
      }
      this.socket_send(content);
    },
    on_sharescreen(e) {
      this.state = e['data']['state']
      if (this.state.host && this.state.host.pk === this.user.pk) {
        this.connectToUsers(this.member)
      }
    },
    exit_sharescreen() {
      if (this.mySharescreen){
        this.mySharescreen.getTracks().forEach(function (track) {
          track.stop();
        });
      }
      this.mySharescreen=null
      this.disconnectAllUser()
      let content = {
        "command": "exit_sharescreen",
        "data": {}
      }
      this.socket_send(content);
    },
    on_exit_sharescreen(e) {
      this.remoteVideo = null
      this.disconnectAllUser()
      this.state = e['data']['state']
    },

    on_member_join(e) {
      this.member = e['data']['member']
      if (e['data']['user']['user'] === this.user.pk) { // is me
        this.my_role = e['data']['user']['role']
      }
      if (this.state.host) {
        if (e['data']['user']['user'] !== this.user.pk) {  // isn't me
          if (this.state.host.pk !== e['data']['user']['user']) { //isn't host
            console.log(this.state.host, e['data']['user'])
            this.connectToNewUser(e['data']['peer_id'])
          }
        }
      }
    },
    on_member_leave(e) {
      this.member = e['data']['member']
      this.disconnectToUser(e['data']['peer_id'])
    },
    get_current_state() {
      let content = {
        "command": "get_current_state",
        "data": {
          "user": this.user,
        }
      }
      this.socket_send(content);
    },
    on_get_current_state(e) {
      this.state = e['data']['state']
    },
  },
  destroyed() {
    if (this.host && this.host.pk === this.user.pk){
    this.exit_sharescreen()
    }
    if (this.mySharescreen) {
      this.mySharescreen.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    if (this.myEmptyVideo) {
      this.myEmptyVideo.getTracks().forEach(function (track) {
        track.stop();
      });

    }

    if (this.room_socket) {
      this.room_socket.close(1000)
    }
  },
}
</script>