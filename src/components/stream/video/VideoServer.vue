<template>
  <div>
    <v-btn @click="myVideoStream">
      <span>Pause Video</span>
      <v-icon>mdi-video</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
name: "VideoServer",
  data: () => ({
    peerConnectTo: ''
  }),
  methods: {
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
  }
}
</script>
