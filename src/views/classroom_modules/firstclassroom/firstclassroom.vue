<template>
    <div>
        <h1>Classroom Client</h1>

      <!--id-->
      <div>
        <div>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
                v-model="peerConnectTo"
                label="Server id"
                outlined
                dense
            ></v-text-field>
          </v-col>
        </div>

        <div>
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

      <div>
        <v-btn small color="primary" @click="connectPeer">connect</v-btn>
      </div>

<!--      <p>Server's Video</p>-->
<!--          <video ref="video" style="max-height: 600px; max-width: 900px;"></video>-->


        <!--show-->
        <div class="d-flex justify-center">
            <v-card
                    height="600px"
                    width="900px"
            >
                <div>
                    <video id="video" playsinline autoplay muted></video>
                </div>
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
                <v-btn>
                    <span>Mute</span>
                    <v-icon>mdi-microphone</v-icon>
                </v-btn>

                <v-btn>
                    <span>Pause Video</span>
                    <v-icon>mdi-video</v-icon>
                </v-btn>

                <v-btn>
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
    import Peer from "peerjs";
    export const createEmptyAudioTrack = () => {
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const dst = oscillator.connect(ctx.createMediaStreamDestination());
      oscillator.start();
      const track = dst.stream.getAudioTracks()[0];
      return Object.assign(track, {enabled: false});
    };
    export const createEmptyVideoTrack = ({width, height}) => {
      const canvas = Object.assign(document.createElement('canvas'), {width, height});
      canvas.getContext('2d').fillRect(0, 0, width, height);
      const stream = canvas.captureStream();
      const track = stream.getVideoTracks()[0];
      return Object.assign(track, {enabled: false});
    };

    export default {
      name: "FirstClassroomIndex",
      data: () => ({
        peer: null,
        peerId: "2",
        peerConnectTo: "1",
      }),
      created() {
        //this.initPeer();
      },
      methods: {
        initPeer() {
          this.peer = new Peer(this.peerId);
        },
        connectPeer() {
          this.initPeer()
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
        async peerCall(call) {

          let audioTrack = createEmptyAudioTrack();
          let videoTrack = createEmptyVideoTrack({width: 640, height: 480});
          let stream = new MediaStream([audioTrack,videoTrack])
          // let stream = await navigator.mediaDevices.getDisplayMedia({
          //   video: false,
          // });
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            let video = this.$refs["video"];
            video.srcObject = remoteStream;
            video.play();
          });
        },
      },
    };
</script>