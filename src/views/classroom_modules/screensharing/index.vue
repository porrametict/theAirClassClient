<template>
    <div>
        <div >
            <h1>CLASSROOM
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
        <div>
            <v-card
                    max-width="800"
                    max-height="400"
            >

            </v-card>
        </div>

        <div class="d-flex justify-center align-center">
            <div id="videos-container"></div>
        </div>

        <div>
            <v-btn
                    rounded
                    color="primary"
                    class="black--text"
                    id="share"
            >Share
            </v-btn>
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

            document.addEventListener('DOMContentLoaded', event => {
                const peer = new Peer('receiver', {
                    host: 'localhost',
                    port: 9000,
                    path: '/'
                })

                peer.on('connection', conn => {
                    conn.on('data', data => {
                        if (data.filetype.includes('image')) {
                            const bytes = new Uint8Array(data.file)
                            const img = document.createElement('img')
                            img.src = 'data:image/png;base64,' + encode(bytes)
                            document.querySelector('div').prepend(img)
                        }
                    })
                })
            })

            const encode = input => {
                const keyStr =
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
                let output = ''
                let chr1, chr2, chr3, enc1, enc2, enc3, enc4
                let i = 0

                while (i < input.length) {
                    chr1 = input[i++]
                    chr2 = i < input.length ? input[i++] : Number.NaN // Not sure if the index
                    chr3 = i < input.length ? input[i++] : Number.NaN // checks are needed here

                    enc1 = chr1 >> 2
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
                    enc4 = chr3 & 63

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64
                    } else if (isNaN(chr3)) {
                        enc4 = 64
                    }
                    output +=
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4)
                }
                return output
            }
        },
        methods: {
            // showPrivateLink(){
            //     // let routeData = this.$router.resolve({name: 'routeName', query: {data: "someData"}});
            // //     // routeData = document.getElementById('unique-token')
            // //     window.open(routeData.href, '_blank');
            //     let uniqueToken = document.getElementById('unique-token').onclick;
            //     document.getElementById('share').onclick = function() {
            //         let routeData = this.$router.resolve({name: 'routeName', query: {data: "someData"}});
            //         window.open(routeData.href, '_blank');
            //         // uniqueToken = '<a href="' + location.href + '" target="_blank"></a>';
            //         // uniqueToken = 'block';
            //     }
            // }

        }
    }
</script>

<style scoped>

</style>