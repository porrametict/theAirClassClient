<template>
    <div ref="video-grid" class="d-flex">
      <v-row>
        <v-col cols="3">
          <video
              :src-object.prop.camel="myVideoStream"
              width="100%"
              height="100%"
              autoplay
          ></video>
        </v-col>
        <v-col cols="3" v-for="(stream_peer, index) in stream_peers" :key="index">
          <video
              :src-object.prop.camel="stream_peer.streamObj"
              width="100%"
              height="100%"
              autoplay
          ></video>
        </v-col>
      </v-row>
    </div>
</template>

<script>
import Peer from "peerjs";
import { mapState } from "vuex";

export default {
  name: "Webcam",
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
      console.log(media.getVideoTracks()[0].enabled,'media')
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
      },
    },
    videoStream_active: {
      deep: false,
      handler: function (newVal, oldVal) {
        // console.log('active',newVal);
        this.myVideoStream.getVideoTracks()[0].enabled = newVal;
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
          this.collectToStreamPeer(call["peer"], userVideoStream);
        });
        call.on("close", (e) => {
          // console.log('new Peer call close', call['peer'])
        });
        this.peers[call["peer"]] = call;
      });
    },

    async connectToNewUser(userId,member) {
      let myVideo = this.myVideoStream;
      const call = this.myPeer.call(userId, myVideo);
      // console.log('connect new', userId)
      call.on("stream", (userVideoStream) => {
        this.collectToStreamPeer(call["peer"], userVideoStream,member);
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
            this.connectToNewUser(e["peer_id"],e);
          }
        }
      });
    },
    collectToStreamPeer(peer_id, video,member) {
      if (!this.checkExistInStreamPeer(peer_id)) {
        this.stream_peers.push({
          member : member,
          microphone_active : member['microphone_active'],
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
      this.room_socket.onopen = function () {};
      this.room_socket.onclose = function (e) {
        if (e.code !== 1000) {
          console.log("Web RTC Room socket closed", e);
        }
      };
      let commands = {
        on_member_join: self.on_member_join,
        on_member_leave: self.on_member_leave,
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
    join_room(id) {
      let content = {
        command: "member_join",
        data: {
          microphone_active :true,
          video_active : this.videoStream_active,
          peer_id: id,
          user: this.user,
          classroom: this.room.classroom,
        },
      };
      this.socket_send(content);
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
    if(this.myVideoStream){
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
</style>