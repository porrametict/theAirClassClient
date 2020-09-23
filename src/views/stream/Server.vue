<template>
  <div>
    <ContentHeader text="Classroom Server"></ContentHeader>
    <!--id-->
    <div>
      <div class="d-flex justify-center">
        <v-col cols="12" sm="6" md="4">
          <v-text-field
              v-model="peerConnectTo"
              label="Connect To"
              outlined
              dense
          ></v-text-field>
        </v-col>
      </div>
    </div>

      <div class="d-flex justify-center">
        <v-btn small color="primary" @click="connectPeer">connect</v-btn>
      </div>

    <!--show-->
    <div class="d-flex justify-center ma-3 object-fit: cover">
      <v-card
          height="600px"
          width="1000px"
      >
        <div>
          <video id="video" height="600px" width="1000px" playsinline autoplay muted></video>
        </div>
      </v-card>
    </div>

    <!--button-->
    <div class=" d-flex justify-space-around ma-4 ">
      <v-bottom-navigation
          v-model ="button"
          multiple
          rounded-pill
          height="50"
          width="600"
          dark
      >
        <v-btn @click="peerCall">
          <span>Mute</span>
          <v-icon>mdi-microphone</v-icon>
        </v-btn>

        <v-btn @click="myVideoStream">
          <span>Pause Video</span>
          <v-icon>mdi-video</v-icon>
        </v-btn>

        <v-btn @click="startSteam">
          <span>Share Screen</span>
          <v-icon>mdi-laptop</v-icon>
        </v-btn>

        <v-btn>
          <span>Other</span>
          <v-icon>mdi-</v-icon>
        </v-btn>

        <v-btn>
          <span>Show Chat</span>
          <v-icon>mdi-forum</v-icon>
        </v-btn>

        <v-btn color="red">
          <span>End Call</span>
          <v-icon>mdi-phone-off-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </div>
</template>

<script>
import ContentHeader from "../../components/share/ContentHeader";
import Peer from "peerjs";
// const myVideo = document.createElement('video');
// myVideo.muted = true;


export default {
  name: "ServerIndex",
  components: {
    ContentHeader,
  },
  data: () => ({
    peer: null,
    peerId: "01",
    peerConnectTo: "02",
    muted: false,
    button: [],
    form: {
      status: true
    }
  }),
  created() {
    this.initPeer();

  },
  methods: {
    initPeer() {
      this.peer = new Peer(this.peerId);
      this.peer.on("open", function (id) {
        let peerId = id;
        console.log("Ask your friend to join using your peer ID: " + peerId);
      });
      this.peer.on("error", function (err) {
        console.log("error" + err);
      });
    },
    connectPeer() {
      let conn = this.peer.connect(this.peerConnectTo);
      // on open will be launch when you successfully connect to PeerServer
      conn.on("open", function () {
        // here you have conn.id
        conn.send("hi! i'm server");
      });

      this.peer.on("connection", function (conn) {
        conn.on("data", function (data) {
          console.log("server receive : ", data);
        });
      });
    },

    // share screen
    async startSteam() {
      let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      let call = this.peer.call(this.peerConnectTo, stream);
        call.on("stream", (remoteStream) => {
        console.log(remoteStream);
        let video = this.$refs["video"];
        video.srcObject = stream;
        video.play();
      });
    },

    // video stream
    async myVideoStream(){
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      let call = this.peer.call(this.peerConnectTo, stream);
      call.on("stream", (remoteStream) => {
        let video = this.$refs["video"];
        video.srcObject = remoteStream;
        video.play();
      });
    },

    // mute stream
    async peerCall() {
      let stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      let call = this.peer.call(this.peerConnectTo, stream);
      call.on("stream", (remoteStream) => {
        let video = this.$refs["video"];
        video.srcObject = remoteStream;
        video.play();
      });
    },
  }
};
</script>
