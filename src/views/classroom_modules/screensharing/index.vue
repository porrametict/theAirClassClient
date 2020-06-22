<template>
    <div>
        <div >
            <h1>Screen Sharing
                <!-- button-->
                <v-btn
                        rounded
                        color="primary"
                        class="black--text"
                        id="share-screen"
                >Share Your Screen
                </v-btn>
            </h1>
        </div>

        <div class="d-flex justify-center align-center">
            <div id="videos-container"></div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "ScreenSharingIndex",
        mounted() {
            async function getDisplayMediaError(error) {
                if (location.protocol === 'http:') {
                }
            }

            async function captureUserMedia(callback) {
                let video = document.createElement('video');
                video.muted = true;
                video.volume = 0;
                video.height = 500;
                video.width = 800;
                try {
                    video.setAttributeNode(document.createAttribute('autoplay'));
                    video.setAttributeNode(document.createAttribute('playsinline'));
                    video.setAttributeNode(document.createAttribute('controls'));
                } catch (e) {
                    video.setAttribute('autoplay', true);
                    video.setAttribute('playsinline', true);
                    video.setAttribute('controls', true);

                }
                if(navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia) {
                    function onGettingSteam(stream) {
                        video.srcObject = stream;
                        videosContainer.insertBefore(video, videosContainer.firstChild);

                        addStreamStopListener(stream, function() {
                            location.reload();
                        });

                        config.attachStream = stream;
                        callback && callback();

                        addStreamStopListener(stream, function() {
                            location.reload();
                        });

                        // showPrivateLink();

                        document.querySelector('.hide-after-join').style.display = 'none';
                    }

                    if(navigator.mediaDevices.getDisplayMedia) {
                        navigator.mediaDevices.getDisplayMedia({video: true}).then(stream => {
                            onGettingSteam(stream);
                        }, getDisplayMediaError).catch(getDisplayMediaError);
                    }
                    else if(navigator.getDisplayMedia) {
                        navigator.getDisplayMedia({video: true}).then(stream => {
                            onGettingSteam(stream);
                        }, getDisplayMediaError).catch(getDisplayMediaError);
                    }
                }
            }

            /* UI specific */
            let videosContainer = document.getElementById("videos-container") || document.body;

            document.getElementById('share-screen').onclick = function() {
                let roomName = document.getElementById('room-name') || { };
                roomName.disabled = true;
                captureUserMedia(function() {
                    conferenceUI.createRoom({
                        roomName: (roomName.value || 'Anonymous') + ' shared his screen with you'
                    });
                });
                this.disabled = true;
            };
        },
        methods: {
            showPrivateLink(){
                // let routeData = this.$router.resolve({name: 'routeName', query: {data: "someData"}});
                // routeData = document.getElementById('unique-token')
                // window.open(routeData.href, '_blank');
                // let uniqueToken = document.getElementById('unique-token').onclick;
                // uniqueToken = '<a href="' + location.href + '" target="_blank">share</a>';
                // uniqueToken = 'block';
            }
        }
    }
</script>

<style scoped>

</style>