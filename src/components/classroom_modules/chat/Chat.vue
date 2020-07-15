<template>
    <v-card class="fill-height d-flex flex-column" outlined>
        <v-card-title class="ma-0 pa-2">
            <slot>
                Chat
            </slot>
        </v-card-title>
        <v-divider></v-divider>
        <!--content-->
        <v-card-text class="app-messages">
            <div class="messages-container">
                <div class="messages" v-chat-scroll>
                    <div v-for="(m,index) in messages" :key="index" class="d-flex flex-column"
                         style="position: relative">
                        <MessageRender :data="m"></MessageRender>
                    </div>
                </div>
            </div>


        </v-card-text>
        <v-divider></v-divider>
        <!--footer-->
        <v-card-actions class="white d-flex align-stretch">
            <v-text-field v-model="text_message"
                          outlined
                          dense
                          class="ma-0 pa-0"
                          hide-details
                          append-outer-icon="mdi-send"
                          placeholder="Type a message.."
                          @keypress.13="send_message"
                          @click:append-outer="send_message"/>
        </v-card-actions>
    </v-card>

</template>

<script>
    import moment from "moment"
    import {mapState} from "vuex";
    import MessageRender from "./MessageRender";

    export default {
        name: "Chat",
        components: {MessageRender},
        props: {
            roomId: {
                type: [String, Number],
                require: true
            },
            classroomId: {
                type: [String, Number],
                require: true
            },
        },
        data: () => ({
            chat: null,
            text_message: null,
            messages: []
            ,
        }),
        async mounted() {
            if (!this.user) {
                await this.$store.dispatch('user/getUser')
            }
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
                    `${window.baseWsURL}/chat/${self.roomId}/`
                )
                this.chat_socket.onopen = function () {
                    self.fetch_message()
                }
                this.chat_socket.onclose = function (e) {
                    console.error('Chat socket closed unexpectedly', e);
                }
                let commands = {
                    'on_new_message': self.on_new_message,
                    'on_fetch_message': self.on_fetch_message,
                }
                this.chat_socket.onmessage = function (e) {
                    let data = JSON.parse(e.data);
                    let command = data['command']
                    commands[command](data)
                }
            },
            socket_send(data) {
                this.chat_socket.send(JSON.stringify(data));
            },
            fetch_message() {
                let data = {
                    "command": "fetch_message",
                    "data": {
                        'room': this.roomId,
                    },
                }
                this.socket_send(data);
            },
            on_fetch_message(e) {
                this.messages = e.data
            },
            send_message() {
                if (this.text_message.trim().length > 0) {
                    let data = {
                        "command": "new_message",
                        "data": {
                            'classroom': this.classroomId,
                            'room': this.roomId,
                            'user': this.user,
                            'content_type': "text",
                            'image_url': null,
                            "message": this.text_message,
                        },
                    }
                    this.socket_send(data);
                    this.text_message = null
                }
            },
            on_new_message(e) {
                this.messages.push(e.data)
            },
        }
    }
</script>

<style scoped>
    .app-messages {
        background: #FFFFFF;
        position: relative;
        height: 100%;
        padding: 2px;
    }

    .messages-container {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }

    .messages {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        flex-shrink: 1;
        box-sizing: border-box;
        overflow-x: hidden;
        position: relative;
        width: 100%;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }


</style>
