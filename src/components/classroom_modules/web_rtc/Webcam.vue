<template>
  <div>
    {{ room }}
    <div ref="video-grid" ></div>
  </div>
</template>

<script>
import Peer from 'peerjs'
import {mapState} from "vuex";

export default {
  name: "Webcam",
  props: {
    room: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      my_role: null,
      room_socket: null,
      member: [],
      myVideoStream: null,
      myPeer: null,
      videoGrid: null,
      peers: {},
    }
  },
  async mounted() {
    this.videoGrid = this.$refs[`video-grid`]
    if (!this.user) {
      await this.$store.dispatch('user/getUser')
    }
    this.newWebSocket()
    this.newPeer()
    this.setVideoStream()
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }, methods: {
    newPeer(){
      this.myPeer = new Peer()
      this.myPeer.on('open', id => {
        this.join_room(id)
      })
      this.myPeer.on('call', call => {
        call.answer(this.myVideoStream)
        const video = document.createElement('video')
        video.setAttribute('width','400px')
        video.setAttribute('height','300px')
        call.on('stream', userVideoStream => {
          this.addVideoStream(video, userVideoStream)
        })
      })
    },
    setVideoStream(){
      const myVideo = document.createElement('video')
      myVideo.setAttribute('width','400px')
      myVideo.setAttribute('height','300px')
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        this.myVideoStream = stream
        this.addVideoStream(myVideo, stream)
      })
    },
    addVideoStream(video, stream){
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      this.videoGrid.append(video)
    },
    connectToNewUser(userId, stream){
      const call = this.myPeer.call(userId, stream)
      const video = document.createElement('video')
      video.setAttribute('width','400px')
      video.setAttribute('height','300px')
      call.on('stream', userVideoStream => {
        this.addVideoStream(video, userVideoStream)
      })
      call.on('close', (e) => {
        video.remove()
      })
      this.peers[userId] = call
    },
    newWebSocket() {
      let self = this
      this.room_socket = new WebSocket(
          `${window.baseWsURL}/web-rtc-room/${self.room.room_code}/`
      )
      this.room_socket.onopen = function () {
        // self.join_room()
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
      }else {
        this.connectToNewUser(e['data']['peer_id'], this.myVideoStream)
      }
    },
    on_member_leave(e) {
      this.member = e['data']['member']
      let userId = e['data']['peer_id']
      if (this.peers[userId]) this.peers[userId].close()

    },
  },
  destroyed() {
    if (this.room_socket) {
      this.room_socket.close(1000)
    }
  },
}
</script>

<style scoped>

</style>