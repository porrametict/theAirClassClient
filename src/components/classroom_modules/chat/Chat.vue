<template>
    <div class="fill-height d-flex flex-column">
        <!--content-->
        <v-card-text class="d-flex flex-column">

            <div v-for="(m,index) in messages" :key="index" class="d-flex flex-column ">
                <MessageRender :data="m"></MessageRender>
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
        async created() {
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
                    `${window.baseWsURL}/chat/${this.roomId}/`
                )
                this.chat_socket.onopen = function () {
                }
                this.chat_socket.onclose = function (e) {
                    console.error('Chat socket closed unexpectedly', e);
                }
                let commands = {
                    'on_new_message': self.on_new_message,
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
            send_message() {
                if (this.text_message.trim().length > 0) {
                    let data = {
                        "command" : "new_message",
                        'room' : this.roomId,
                        'classroom' : this.classroomId,
                        'content': {
                            "type" : "text",
                            "message" : this.text_message,
                            "timestamp" : moment().format('LT')
                        },
                        'user' : this.user
                    }
                    this.socket_send(data);
                    this.text_message = null
                }
            },
            on_new_message(e) {
                this.messages.push(e)
            },
        }
    }
</script>

<style scoped>
</style>
