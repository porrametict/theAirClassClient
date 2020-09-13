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
    <div class="d-flex justify-center ma-3">
      <v-card
          height="600px"
          width="1000px"
      >
        <div>
          <video id="video" playsinline autoplay muted></video>
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
          width="800"
          dark
      >
        <v-btn @click="peerCall">
          <span>Mute1</span>
          <v-icon>mdi-microphone</v-icon>
        </v-btn>

        <v-btn @click="Microphone">
          <span>Mute2</span>
          <v-icon>mdi-microphone</v-icon>
        </v-btn>

        <v-btn @click="MuteMic">
          <span >Mute</span>
          <v-icon>mdi-microphone-off</v-icon>

        </v-btn>

        <v-btn>
          <span>Pause Video</span>
          <v-icon>mdi-video</v-icon>
        </v-btn>

        <v-btn @click="startSteam" class="mute">
          <span>Share Screen</span>
          <v-icon>mdi-laptop</v-icon>
        </v-btn>

        <v-btn>
          <span>Show Chat</span>
          <v-icon>mdi-forum</v-icon>
        </v-btn>

        <v-btn>
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

export default {
  name: "ServerIndex",
  components: {
    ContentHeader,
  },
  data: () => ({
    peer: null,
    peerId: "001",
    peerConnectTo: "002",
    muted1: false,
    muted2: false,
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

    async peerCall() {
      // await this.checkForVideoAudioAccess()
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: this.MuteMic
      });
      let call = this.peer.call(this.peerConnectTo, stream);


      call.on("stream", (remoteStream) => {
        let video = this.$refs["video"];
        video.srcObject = remoteStream;
        video.play();
      });
    },
     async Microphone() {
       navigator.mediaDevices.getUserMedia({ audio: true })
               .then(function(stream) {
                 console.log('You let me use your mic!')
               })
               .catch(function(err) {
                 console.log('No mic for you!')
               });

     },
     async MuteMic() {
      this.Microphone();
       navigator.mediaDevices.getUserMedia({ audio: false})
              .then(function (stream) {
                console.log('No mic for you!')
              })
              .catch(function(err) {
                console.log('You let me use your mic!')
              });

     }

},
};
</script>
