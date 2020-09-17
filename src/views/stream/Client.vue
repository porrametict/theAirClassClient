<template>
  <div>
    <ContentHeader text="Classroom Client"></ContentHeader>
        <div>
          <div class="d-flex justify-center">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  v-model="peerId"
                  label="My id"
                  outlined
                  disabled
              ></v-text-field>
            </v-col>
          </div>
        </div>

        <div class="d-flex justify-center">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                  v-model="peerConnectTo"
                  label="Server id"
                  outlined
                  dense
              ></v-text-field>
            </v-col>
          </div>

        <!--connect-->
        <div class="d-flex justify-center ma-3">
          <v-btn small color="primary" @click="connectPeer">connect</v-btn>
        </div>

        <!--show-->
        <div class="d-flex justify-center">
          <v-card>
            <video ref="video" height="600px" width="1000px" playsinline autoplay controls></video>
          </v-card>
        </div>

        <!--button-->
        <div class=" d-flex justify-space-around ma-4 ">
          <v-bottom-navigation
              rounded-pill
              height="50"
              width="800"
              dark
          >
              <v-btn @click="ToggleMicEnable">
                  <span >Mute</span>
                  <v-icon> {{ microphone == true? 'mdi-microphone' :'mdi-microphone-off' }} </v-icon>

              </v-btn>

            <v-btn>
              <span>Pause Video</span>
              <v-icon>mdi-video</v-icon>
            </v-btn>

            <v-btn @click="startSteam">
              <span>Share Screen</span>
              <v-icon>mdi-laptop</v-icon>
            </v-btn>

            <v-btn >
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
  name: "ClientIndex",
  components: {
    ContentHeader,
  },
  data: () => ({
    peer: null,
    peerId: "02",
    peerConnectTo: "01",
  }),
  created() {
    this.initPeer();
  },
  methods: {
    initPeer() {
      this.peer = new Peer(this.peerId);
    },

    connectPeer() {
      //this.initPeer();
      let conn = this.peer.connect(this.peerConnectTo);
      // on open will be launch when you successfully connect to PeerServer
      conn.on("open", function () {
        // here you have conn.id
        conn.send("hi! i'm client");
      });

      this.peer.on("connection", function (conn) {
        conn.on("data", function (data) {
          console.log("client receive : ", data);
        });
      });

      this.peer.on("call", this.peerCall);
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

      async peerCall(call) {
      // await this.checkForVideoAudioAccess()
      let my_stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      call.answer(my_stream);
      call.on("stream", (remoteStream) => {
        let video = this.$refs["video"];
        video.srcObject = remoteStream;
        video.play();

      });

    },
      async ToggleMicEnable() {

          this.microphone = !this.microphone
          this.my_stream.getAudioTracks()[0].enabled = this.microphone;


      },

  }

};
</script>
