<template>
<div>
    <v-btn id="media" @click="ToggleMicEnable">
        <span>Mute</span>
        <v-icon>{{ microphone === true ? 'mdi-microphone' : 'mdi-microphone-off' }}


        </v-icon>
    </v-btn>
</div>
</template>

<script>
    export default {
        name: "Microphone",
        data: () => ({
            microphone: true,
            // my_stream: true
        }),
        methods: {
            async getMyVideoStream() {
                let media = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }).then(stream => {
                    return stream
                }).catch(error => {
                    console.log(error)
                })
                if (!this.myVideoStream)  this.myVideoStream = media
                return media
            },
            async ToggleMicEnable() {
                this.microphone = !this.microphone
                this.myVideoStream.getAudioTracks()[0].enabled = this.microphone;
            },
        }
    }
</script>

<style scoped>

</style>
