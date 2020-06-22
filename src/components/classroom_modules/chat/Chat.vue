<template>
    <div class="fill-height d-flex flex-column">
        <!--content-->
        <v-card-text class="d-flex flex-column overflow-y-auto" style="max-height: 70vh">

            <div v-for="(m,index) in messages" :key="index" class="d-flex flex-column ">




                <!--student-->
                <div >
                    <div class="d-flex mr-auto">
                        <v-icon large>mdi-account</v-icon>
                        <v-card outlined class="my-1 mx-2">
                            <v-card-text class="white">
                                <p class="display-1 ma-0 pa-0">{{m}}</p>
                            </v-card-text>
                        </v-card>
                    </div>

                </div>

            </div>

        </v-card-text>

        <!--footer-->
        <v-card-text class="white mt-auto d-flex align-stretch">
            <v-text-field v-model="text_message" outlined class="ma-0 pa-0"
                          hide-details
                          append-outer-icon="mdi-send"
                          placeholder="Type a message.."
                          @keypress.13="send_message"
                          @click:append-outer="send_message"/>
        </v-card-text>
    </div>

</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "Chat",
        props: {
            roomId: {
                type: [String, Number],
                require: true
            },
        },
        data: () => ({
            chat: null,
            text_message: null,
            messages: []
            ,
            roomInfo: null
        }),
        async created() {
            this.newWebSocket()
        },
        computed: {
            ...mapState({
                user: state => state.user.user
            })
        },
        methods: {
            newWebSocket() {
                let self = this
                this.chat_socket = new WebSocket(
                    `${window.baseWsURL}/chat/${this.roomId}/`
                )
                this.chat_socket.onopen = function () {
                }
                this.chat_socket.onclose = function (e) {
                    console.error('Chat socket closed unexpectedly', e);
                }
                let commands = {
                    'chat_message': self.on_new_message,
                }
                this.chat_socket.onmessage = function (e) {
                    let data = JSON.parse(e.data);
                    let command = data['type']
                    commands[command](data)
                }
            },
            socket_send(data) {
                this.chat_socket.send(JSON.stringify(data));
            },
            send_message() {
                if (this.text_message.trim().length > 0) {
                    let data = {
                        'content': this.text_message
                    }
                    this.socket_send(data);
                    this.text_message = null
                }
            },
            on_new_message(e) {
                console.log('data',e)
                let message = e.data
                this.messages.push(message)
            },
        }
    }
</script>

<style scoped>
</style>