<template>
  <div class="d-flex ml-2" ref="video-grid">
    <v-btn @click="getMySharescreen">
        <span>Share Screen</span>
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
  return Object.assign(track, { enabled: false });
};

export const createEmptyVideoTrack = ({ width, height }) => {
  const canvas = Object.assign(document.createElement("canvas"), {
    width,
    height,
  });
  canvas.getContext("2d").fillRect(0, 0, width, height);

  const stream = canvas.captureStream();
  const track = stream.getVideoTracks()[0];

  return Object.assign(track, { enabled: false });
};

export default {
  name: "ShareScreen",
  data: () => ({
    my_role: null,
    room_socket: null,
    member: [],
    myPeer: null,
    peers: {},
    stream_peers: [],
    mySharescreen: null,
    videoGrid: null,

  }),
  async mounted() {
    this.videoGrid = this.$refs[`video-grid`]
    if (!this.user) {
      await this.$store.dispatch('user/getUser')
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    // share screen
    async getMySharescreen() {
      let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      }).then(stream => {
        return stream
      }).catch(error => {
        console.log(error)
      })
      if (!this.mySharescreen) this.mySharescreen = stream
      let video = this.$refs["video"];
      // video.srcObject = stream;
      // video.play();
      return video
    },

    // Peer
    async newPeer() {
      this.myPeer = new Peer()
      this.myPeer.on('open', id => {
        console.log('my peer', id)
        this.join_room(id)
      })
      this.myPeer.on('call', async call => {
        let mySharescreen = await this.getMySharescreen()
        call.answer(mySharescreen)
        call.on('stream', userSharescreen => {
          this.stream_peers.push({
            peer: call['peer'],
            streamObj: userSharescreen
          })
        })
        call.on('close', (e) => {
          console.log('new Peer call close', call['peer'])
        })
        this.peers[call['peer']] = call
      })
    },

    async connectToNewUser(userId) {
      let myVideo = await this.getMySharescreen()
      const call = this.myPeer.call(userId, myVideo)
      console.log('connect new', userId)
      call.on('stream', userSharescreen => {
        this.stream_peers.push({
          peer: call['peer'],
          streamObj: userSharescreen
        })
      })
      call.on('close', (e) => {
        console.log('call close in connect', call['peer'])
      })
      this.peers[userId] = call
      console.log(this.peers)


    },
    connectToUsers(member) {
      member.forEach( (e) => {
        let peer_id = e['peer_id']
        if (peer_id !== this.myPeer.id) { // not connect to my self
          if (!this.peers[peer_id]) {
            this.connectToNewUser((e['peer_id']))
          }
        }
      })
    },
    disconnectToUser(peer_id) {
      if (this.peers[peer_id]) {
        this.peers[peer_id].close()
        delete this.peers[peer_id]
        this.stream_peers = _.remove(this.stream_peers, (e) => {
          return e['peer'] === peer_id
        })
      }
    },


    // Main WebSocket
    newWebSocket() {
      let self = this
      this.room_socket = new WebSocket(
          `${window.baseWsURL}/web-rtc-room/${self.room.room_code}/`
      )
      this.room_socket.onopen = function () {

      }
      this.room_socket.onclose = function (e) {
        if (e.code !== 1000) {
          console.log('Web RTC Room socket closed', e);
        }
      }
      let commands = {
        'on_member_join': self.on_member_join,
        'on_member_leave': self.on_member_leave,
      }
      this.room_socket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let command = data['command']
        commands[command](data)
      }
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
  on_member_join(e) {
    this.member = e['data']['member']
    if (e['data']['user']['user'] === this.user.pk) { // is me
      this.my_role = e['data']['user']['role']
    }
    this.connectToUsers(e['data']['member'])
  },
  on_member_leave(e) {
    this.member = e['data']['member']
    this.disconnectToUser(e['data']['peer_id'])
  },
}
</script>