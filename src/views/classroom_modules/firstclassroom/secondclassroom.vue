<template>
  <div>
    <h1>Classroom Server</h1>

    <!--id-->
    <div>
      <div>
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

    <div>
      <v-btn small color="primary" @click="connectPeer">connect</v-btn>
    </div>

<!--    <div>-->
<!--      <v-btn small color="primary" @click="startSteam">Start Steam</v-btn>-->
<!--    </div>-->

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

        <v-btn @click="startSteam">
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

  export default {
  name: "SecondClassroomIndex",
    data: () => ({
      peer: null,
      peerId: "1",
      peerConnectTo: "2",
    }),
    created() {
      this.initPeer();
    },
    methods: {
      initPeer() {
        this.peer = new Peer(this.peerId);
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
        // this.peer.on("call", this.peerCall);
      },
      async startSteam() {
        let stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        let call = this.peer.call(this.peerConnectTo, stream);
        call.on("stream", (remoteStream) => {
          console.log(remoteStream);
        });
      },
    },
  };
</script>