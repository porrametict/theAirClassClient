<template>
  <div class="d-flex ml-2">
     <video :src-object.prop.camel="mySharescreen" width="100px" height="100" autoplay controls></video>
     <v-text-field  label="box" v-model="shareconnect"></v-text-field>
    <v-btn @click="sharescreen">
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
    stream_peers: [],
    shareconnect: null,
    state: null,
  }),
  async mounted() {
    // this.videoGrid = this.$refs[`video-grid`]
    // if (!this.user) {
    //   await this.$store.dispatch('user/getUser')
    // }
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

      // let call = this.peer.call(this.connectToUsers,stream);
      // call.on("stream", (remoteStream) => {
      //   console.log(remoteStream);
      //   let video = this.$refs["video"];
      //   video.srcObject = stream;
      //   video.play();
      // });
      return this.mySharescreen
    },

    // Peer
    async newPeer() {
      this.myPeer = new Peer()
      this.myPeer.on('open', id => {
        console.log('share conncet ', id)
        this.join_room(id)
      })
      this.myPeer.on('call', async call => {
        // let myVideo = await this.getMySharescreen()
        // call.answer(myVideo)
        let audioTrack = createEmptyAudioTrack();
        let videoTrack = createEmptyVideoTrack({ width: 640, height: 480 });
        let stream = new MediaStream([audioTrack, videoTrack]);
        call.answer(stream);
        call.on('stream', userVideoStream => {
          // this.stream_peers.push({
          //   peer: call['peer'],
          //   streamObj: userVideoStream
          // })

          console.log("connect");
          this.mySharescreen = userVideoStream
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
      call.on('stream', userVideoStream => {
        this.stream_peers.push({
          peer: call['peer'],
          streamObj: userVideoStream
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
        this.stream_peers = this.stream_peers.filter(function (e) {
          return e['peer'] !== peer_id
        })
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
        'on_get_current_state': self.on_get_current_state
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
    sharescreen() {
      this.getMySharescreen()
      console.log('sharescreen');
       let content = {
        "command": "sharescreen",
        "data": {
          "peer_id": this.myPeer.id,
          "user": this.user,
        }
      }
      this.socket_send(content);
    },
    on_sharescreen(e){
      console.log(e);
    },
    on_member_join(e) {
      this.member = e['data']['member']
      if (e['data']['user']['user'] === this.user.pk) { // is me
        this.my_role = e['data']['user']['role']
      }
      if(this.state.host && (e['data']['user']['user' ]=== this.state.host.pk)){
        console.log('sharescreen', this.state);
        this.connectToNewUser(e['data']['peer_id'])
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
    on_get_current_state(e) { ;
      console.log(e);
      this.state = e['data']['state']
    },
  },
  destroyed() {
    if (this.room_socket) {
      this.room_socket.close(1000)
    }
  },
}
</script>