<template>
    <div>
        <h1>Classroom Name</h1>
        <div>
            <v-btn @click="createMediaStream()"
            >Create Stream
            </v-btn>
        </div>

        <!--show-->
        <div class="d-flex justify-center">
            <v-card
                    height="600"
                    width="900"
            >
                <div>
                    <video id="localVideo" playsinline autoplay muted></video>
                    <video id="remoteVideo" playsinline autoplay></video>

                </div>


            </v-card>
        </div>

        <!--button-->
        <div class=" d-flex justify-space-around ma-4 ">
            <v-bottom-navigation
                    rounded-pill
                    height="50"
                    width="800"
                    v-model="bottomNav"
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
    export default {
        name: "FirstClassroomIndex",
        data () {
            return {
                bottomNav: 1,
            }
        },
    }
</script>

<style scoped>

</style>