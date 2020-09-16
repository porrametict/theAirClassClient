<template>
  <div>
    <v-btn @click="peerCall">
      <span>Mute</span>
      <v-icon>mdi-microphone</v-icon>
    </v-btn>
</div>
</template>

<script>
export default {
name: "MuteServer",
  data: () => ({
    peerConnectTo:''
  }),
  methods:{
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
}
</script>