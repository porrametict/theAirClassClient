<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 my-3">
                <h2>Room</h2>
                <!--<input v-model="roomId">-->
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="">
                    <vue-webrtc ref="webrtc"
                                width="100%"
                                :roomId="roomId"
                                v-on:joined-room="logEvent"
                                v-on:left-room="logEvent"
                                v-on:opened-room="logEvent"
                                v-on:share-started="logEvent"
                                v-on:share-stopped="logEvent"
                                @error="onError" />
                </div>
                <div class="row">
                    <div class="d-flex col-md-12 my-3 sm12">
                        <!--<v-btn type="button" class="primary mx-9 black&#45;&#45;text" @click="onJoin">Join</v-btn>-->
                        <!--<v-btn type="button" class="primary mx-9 black&#45;&#45;text" @click="onLeave">Leave</v-btn>-->
                        <v-btn type="button" class="primary mx-9 black--text" @click="onCapture">Capture Photo</v-btn>
                        <v-btn type="button" class="primary mx-9 black--text" @click="onShareScreen">Share Screen</v-btn>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h2>Captured Image</h2>
                <figure class="figure">
                    <img :src="img" class="img-responsive" />
                </figure>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "SteamsIndex",
        components: {
        },
        data() {
            return {
                img: null,
                roomId: "public-room"
            };
        },
        computed: {
        },
        watch: {
        },
        methods: {
            onCapture() {
                this.img = this.$refs.webrtc.capture();
            },
            onJoin() {
                this.$refs.webrtc.join();
            },
            onLeave() {
                this.$refs.webrtc.leave();
            },
            onShareScreen() {
                this.img = this.$refs.webrtc.shareScreen();
            },
            onError(error, stream) {
                console.log('On Error Event', error, stream);
            },
            logEvent(event) {
                console.log('Event : ', event);
            },
        }
    };
</script>

<style scoped>


</style>
