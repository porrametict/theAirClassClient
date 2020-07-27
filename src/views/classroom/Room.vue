<template>
    <div class="fill-height overflow-hidden" v-if="room">
        <v-row style="box-sizing: border-box" class="fill-height">
            <v-col cols="9">
                <div>
                    <v-row>
                        <v-col>
                            <ScreenSharing></ScreenSharing>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <div class="d-flex justify-center align-center">
                                <v-btn @click="new_action('ChoiceQuiz')"> start choice quiz</v-btn>
                                <v-btn color="red" large class="white--text" @click="end">End</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-col>

            <v-col cols="3">
                <component :is="room_state.module" v-if="room_state.module"></component>
                <Chat
                        v-if="room_state.state === 'normal'"
                        :room="room"
                        :classroom-id="classroom_id"
                ></Chat>
            </v-col>
        </v-row>

    </div>
</template>

<script>
    import ScreenSharing from "../../components/classroom_modules/screensharing/ScreenSharing";
    import Chat from "../../components/classroom_modules/chat/Chat";
    import ChoiceQuiz from "../../components/classroom_modules/choicequiz/ChoiceQuiz";
    import {mapState} from "vuex";

    export default {
        name: "ClassroomRoom",
        components: {Chat, ScreenSharing, ChoiceQuiz},
        data() {
            return {
                room: null,
                classroom_id: this.$route.params.id,
                room_state : {
                    state : "normal", // normal $$ playing,
                    module : null   // null && module_name
                }
            }
        },
        async mounted() {
            if (!this.user) {
                await this.$store.dispatch('user/getUser')
            }
            await this.loadData()
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
                this.room_socket = new WebSocket(
                    `${window.baseWsURL}/room/${self.room.room_code}/`
                )
                this.room_socket.onopen = function () {

                }
                this.room_socket.onclose = function (e) {
                    console.error('Room socket closed unexpectedly', e);
                }
                let commands = {
                    'on_new_action': self.on_new_action,
                }
                this.room_socket.onmessage = function (e) {
                    let data = JSON.parse(e.data);
                    let command = data['command']
                    commands[command](data)
                }
            },
            socket_send(data) {
                this.room_socket.send(JSON.stringify(data));
            },
            new_action(module_name) {
                let content = {
                    "command": "new_action",
                    "data" : {
                        "module" : module_name
                    }
                }
                this.socket_send(content);
            },
            on_new_action(e) {
                console.log(e,"new_action")
                this.room_state.state = "playing"
                this.room_state.module = e.data.module

            },
            async loadData() {
                this.room = await this.$store.dispatch('classroom/room/getRoom', this.$route.params.room_id)
            },
            async end() {
                this.room['status'] = false
                let data = await this.$store.dispatch('classroom/room/updateRoom', this.room)
                if (data && data['status'] === false) {
                    await this.$router.push({name: 'BoardClassroom', params: {id: this.$route.params.id}})
                }
            }
        }
    }
</script>

<style scoped>

</style>