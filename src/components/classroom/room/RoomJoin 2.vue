<template>
  <div>
    <div class="d-flex justify-center">
      <v-card
          width="700"
          height="550"
      >
        <v-card-text class="d-flex flex-column fill-height">
          <!--show video-->
          <div class="d-flex justify-center">
            <v-card>
              <video ref="video" height="350px" width="500px" playsinline autoplay></video>
            </v-card>
          </div>

          <div class="d-flex justify-center">
            <v-switch v-model="switch1"  @click="myVideo" inset prepend-icon="mdi-video"></v-switch>
          </div>

          <div class="d-flex justify-center align-md-end flex-grow-1">
            <v-btn>
              <v-icon>mdi-video-wireless-outline</v-icon>
              <span>Start Meet</span>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomJoin",
  data () {
    return {
      switch1: false,
    }
  },
  methods: {
    async myVideo(){
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      let video = this.$refs["video"];
      video.srcObject = stream;
      video.play();
    },
  }
}
</script>

<style scoped>
</style>