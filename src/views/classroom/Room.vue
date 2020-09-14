<template>
  <div class="fill-height overflow-hidden" v-if="room">
    <v-row style="box-sizing: border-box" class="fill-height">
      <v-col>
        <div>
          <v-row>
            <v-col>
              <ScreenSharing></ScreenSharing>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="d-flex justify-center align-center flex-column">
                <div v-if="my_role <= 2">
                  <v-btn @click="new_action('ChoiceQuiz')" :disabled="room_state.state !== 'normal'">
                    start choice quiz
                  </v-btn>
                  <v-btn @click="new_action('Attendance')" :disabled="room_state.state !== 'normal'">
                    start Attendance
                  </v-btn>
                  <v-btn @click="new_action('GameQuestion')" :disabled="room_state.state !== 'normal'">
                    start Game Question
                  </v-btn>
                  <v-btn @click="new_action('Poll')" :disabled="room_state.state !== 'normal'">
                    start Poll
                  </v-btn>
                </div>
                <v-btn color="red" large class="white--text" @click="end" :disabled="room_state.state !== 'normal'">
                  End
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col cols="3">
        <component
            class="text-center"
            v-if="room_state.module"
            :is="room_state.module"
            :room="room"
            :role="my_role"
            :host="room_state.host"
            @ended="module_end"
        >
        </component>
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
import Attendance from "@/components/classroom_modules/attendance/Attendance";
import GameQuestion from "@/components/classroom_modules/gamequestion/GameQuestion";
import Poll from "@/components/classroom_modules/poll/Poll";

export default {
  name: "ClassroomRoom",
  components: {Poll, GameQuestion, Attendance, Chat, ScreenSharing, ChoiceQuiz},
  data() {
    return {
      my_role: null,
      room: null,
      member: [],
      classroom_id: this.$route.params.id,
      room_state: {
        state: "normal", // normal $$ playing,
        module: null,   // null && module_name
        host: null
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

    //GE functions
    async loadData() {
      this.room = await this.$store.dispatch('classroom/room/getRoom', this.$route.params.room_id)
    },

    async end() {
      this.room['status'] = false
      let data = await this.$store.dispatch('classroom/room/updateRoom', this.room)
      if (data && data['status'] === false) {
        await this.$router.push({name: 'BoardClassroom', params: {id: this.$route.params.id}})
      }
    },


    module_end(e) {

      let events = {
        'choice_quiz': this.choice_quiz_end,
        'attendance': this.attendance_end,
        'game_question': this.game_question_end,
        'poll': this.poll_end,
      }
      events[e.event](e.data)

    },
    choice_quiz_end(e) {
      let host = this.room_state.host

      this.room_state.state = "normal"
      this.room_state.module = null
      this.room_state.host = null

      if (host.pk === this.user.pk) {
        this.set_room_state()
      }


    },
    attendance_end(e) {
      let host = this.room_state.host
      this.room_state.state = "normal"
      this.room_state.module = null
      this.room_state.host = null
      if (host.pk === this.user.pk) {
        this.set_room_state()
      }
    },
    game_question_end(e) {
      let host = this.room_state.host
      this.room_state.state = "normal"
      this.room_state.module = null
      this.room_state.host = null
      if (host.pk === this.user.pk) {
        this.set_room_state()
      }
    }, poll_end(e) {
      let host = this.room_state.host


      this.room_state.state = "normal"
      this.room_state.module = null
      this.room_state.host = null
      if (host.pk === this.user.pk) {
        this.set_room_state()
      }
    },

    // main WebSocket
    newWebSocket() {
      let self = this
      this.room_socket = new WebSocket(
          `${window.baseWsURL}/room/${self.room.room_code}/`
      )
      this.room_socket.onopen = function () {
        self.join_room()
        self.get_current_state()

      }
      this.room_socket.onclose = function (e) {
        if (e.code !== 1000) {
          console.log('Room socket closed', e);
        }
      }
      let commands = {
        'on_new_action': self.on_new_action,
        'on_member_join': self.on_member_join,
        'on_member_leave': self.on_member_leave,
        'on_get_current_state': self.on_get_current_state,
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


    // WebSocket functions
    join_room() {
      let content = {
        "command": "member_join",
        "data": {
          "user": this.user,
          "classroom": this.room.classroom
        }
      }
      this.socket_send(content);
    },
    on_member_join(e) {
      this.member.push(e['data']['member'])
      if (e['data']['user']['user'] === this.user.pk) { // is me
        this.my_role = e['data']['user']['role']
      }
    },
    on_member_leave(e) {
      this.member.push(e['data'])
    },
    get_current_state() {
      let content = {
        "command": "get_current_state",
        "data": {
          "user": this.user,
        }
      }
      this.socket_send(content);
    },
    on_get_current_state(e) {
      this.room_state = e['data']['state']
    },
    set_room_state() {
      let content = {
        "command": "new_action",
        "data": {
          'state': this.room_state
        }
      }
      this.socket_send(content);
    },
    new_action(module_name) {
      let content = {
        "command": "new_action",
        "data": {
          'state': {
            'state': 'playing',
            "module": module_name,
            "host": this.user
          }
        }
      }
      this.socket_send(content);
    },
    on_new_action(e) {
      this.room_state = e['data']['state']
    },

  },
  destroyed() {
    if (this.room_socket) {
      this.room_socket.close(1000)
    }
  },
}
</script>

<style scoped>

</style>