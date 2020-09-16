<template>
  <div>
    <v-btn @click="startSteam">
      <span>Share Screen</span>
      <v-icon>mdi-laptop</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
name: "SharescreenServer",
  data: () => ({
    peerConnectTo: ''
  }),
  methods:{
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
  }
}
</script>