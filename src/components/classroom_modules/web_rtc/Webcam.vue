<template>
  <div ref="video-grid" id="video-grid">

    <div class="video_field">
        <video
            v-if="videoStream_active"
            :src-object.prop.camel="myVideoStream"
            autoplay
        ></video>
      <div v-else class="d-flex fill-height justify-center align-center  grey lighten-2">
        <ImageProfile :user="user"
                      :circle="true"
                      width="100px"
                      height="100px"
                      font_size_class="headline"
        ></ImageProfile>
      </div>
        <div class="black under_video text-right white--text">
          {{ user.first_name }} {{ user.last_name }} (me)
        </div>

    </div>

    <div
        v-for="(stream_peer, index) in stream_peers" :key="index"
        class="video_field">
      <video
          v-if="stream_peer.video_active"
          :src-object.prop.camel="stream_peer.streamObj"
          autoplay
      ></video>
      <div v-else class="d-flex fill-height justify-center align-center grey lighten-2">
        <ImageProfile :user="stream_peer.member"
                      :circle="true"
                      width="100px"
                      height="100px"
                      font_size_class="headline"
        ></ImageProfile>
      </div>

      <div class="black under_video text-right white--text">
        {{ stream_peer.member.first_name }} {{ stream_peer.member.first_name }}
      </div>
    </div>
  </div>
</template>

<script>
import Peer from "peerjs";
import {mapState} from "vuex";
import ImageProfile from "@/components/core/user/ImageProfile";

export default {
  name: "Webcam",
  components: {ImageProfile},
  props: {
    room: {
      type: Object,
      require: true,
    },
  },
  data: () => ({
    my_role: null,
    room_socket: null,
    member: [],
    myVideoStream: null,
    myPeer: null,
    peers: {},
    stream_peers: [],
  }),
  async mounted() {
    if (!this.user) {
      await this.$store.dispatch("user/getUser");
    }
    let media = await this.getMyVideoStream();
    this.newWebSocket();
    if (media) {
      await this.newPeer();
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.user.user,
      microphone_active: (state) =>
          state.classroom_modules.web_rtc.microphoneActive,
      videoStream_active: (state) =>
          state.classroom_modules.web_rtc.videoStreamActive,
    }),
  },
  watch: {
    microphone_active: {
      deep: false,
      handler: function (newVal, oldVal) {
        // console.log('active',newVal);
        this.myVideoStream.getAudioTracks()[0].enabled = newVal;
        this.change_media_active()
      },
    },
    videoStream_active: {
      deep: false,
      handler: function (newVal, oldVal) {
        // console.log('active',newVal);
        this.myVideoStream.getVideoTracks()[0].enabled = newVal;
        this.change_media_active()
      },
    }
  },

  methods: {
    // Media
    async getMyVideoStream() {
      let media = await navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            return stream;
          })
          .catch((error) => {
            console.log(error);
          });
      if (!this.myVideoStream) this.myVideoStream = media;
      return media;
    },
    // Peer
    async newPeer() {
      this.myPeer = new Peer();
      this.myPeer.on("open", (id) => {
        // console.log('my peer', id)
        this.join_room(id);
      });
      this.myPeer.on("call", async (call) => {
        let myVideo = this.myVideoStream;
        call.answer(myVideo);
        call.on("stream", (userVideoStream) => {
          let user = this.getMemberFromPeer(call['peer'])
          if (user) {
            this.collectToStreamPeer(call["peer"], userVideoStream, user);
          }
        });
        call.on("close", (e) => {
          // console.log('new Peer call close', call['peer'])
        });
        this.peers[call["peer"]] = call;
      });
    },
    getMemberFromPeer(peer_id) {
      let user = null
      this.member.forEach((e) => {
        if (peer_id === e.peer_id) {
          user = e
        }
      })
      return user
    },
    async connectToNewUser(userId, member) {
      let myVideo = this.myVideoStream;
      const call = this.myPeer.call(userId, myVideo);
      // console.log('connect new', userId)
      call.on("stream", (userVideoStream) => {
        this.collectToStreamPeer(call["peer"], userVideoStream, member);
      });
      call.on("close", (e) => {
        // console.log('call close in connect', call['peer'])
      });
      this.peers[userId] = call;
    },
    connectToUsers(member) {
      member.forEach((e) => {
        let peer_id = e["peer_id"];
        if (peer_id !== this.myPeer.id) {
          // not connect to my self
          if (!this.peers[peer_id]) {
            this.connectToNewUser(e["peer_id"], e);
          }
        }
      });
    },
    collectToStreamPeer(peer_id, video, member) {
      if (!this.checkExistInStreamPeer(peer_id)) {
        this.stream_peers.push({
          member: member,
          microphone_active: member['microphone_active'],
          video_active: member['video_active'],
          peer: peer_id,
          streamObj: video,
        });
      }
    },
    checkExistInStreamPeer(peer_id) {
      let IsExist = false;
      this.stream_peers.forEach((e) => {
        if (e["peer"] === peer_id) {
          IsExist = true;
        }
      });
      return IsExist;
    },
    disconnectToUser(peer_id) {
      if (this.peers[peer_id]) {
        this.peers[peer_id].close();
        delete this.peers[peer_id];
        this.stream_peers = this.stream_peers.filter(function (e) {
          return e["peer"] !== peer_id;
        });
      }
    },

    // Main WebSocket
    newWebSocket() {
      let self = this;
      this.room_socket = new WebSocket(
          `${window.baseWsURL}/web-rtc-room/${self.room.room_code}/`
      );
      this.room_socket.onopen = function () {
        self.get_current_state()
      };
      this.room_socket.onclose = function (e) {
        if (e.code !== 1000) {
          console.log("Web RTC Room socket closed", e);
        }
      };
      let commands = {
        on_member_join: self.on_member_join,
        on_member_leave: self.on_member_leave,
        on_change_media_active: self.on_change_media_active,
        on_get_current_state: self.on_get_current_state,
      };
      this.room_socket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let command = data["command"];
        commands[command](data);
      };
    },
    socket_send(data) {
      this.room_socket.send(JSON.stringify(data));
    },
    // WebSocket functions
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
      this.member = e["data"]["member"];
    },
    join_room(id) {
      let content = {
        command: "member_join",
        data: {
          microphone_active: this.microphone_active,
          video_active: this.videoStream_active,
          peer_id: id,
          user: this.user,
          classroom: this.room.classroom,
        },
      }
      this.socket_send(content);
    },
    change_media_active() {
      let content = {
        command: "change_media_active",
        data: {
          microphone_active: this.microphone_active,
          video_active: this.videoStream_active,
          user: this.user,
        },
      }
      this.socket_send(content);
    },
    on_change_media_active(e) {
      for (let i = 0; i < this.stream_peers.length; i++) {
        if (this.stream_peers[i]['member']['pk'] === e['data']['user']['pk']) {
          this.stream_peers[i]['member'] = e['data']['user']
          this.stream_peers[i]['microphone_active'] = e['data']['user']['microphone_active']
          this.stream_peers[i]['video_active'] = e['data']['user']['video_active']
        }
      }
    },
    on_member_join(e) {
      this.member = e["data"]["member"];
      if (e["data"]["user"]["user"] === this.user.pk) {
        // is me
        this.my_role = e["data"]["user"]["role"];
      }
      this.connectToUsers(e["data"]["member"]);
    },
    on_member_leave(e) {
      this.member = e["data"]["member"];
      this.disconnectToUser(e["data"]["peer_id"]);
    },
  },


  destroyed() {
    if (this.myVideoStream) {
      this.myVideoStream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    if (this.room_socket) {
      this.room_socket.close(1000);
    }
  },
};
</script>

<style scoped>
#video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
  grid-gap: 10px;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video_field {
  position: relative
}
.under_video {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-right:5px;
}
</style>
