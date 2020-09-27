<template>
  <div class="fill-height overflow-hidden" v-if="room">
    <ContentHeader text="Classroom Teacher"></ContentHeader>
    <br style="box-sizing: border-box" class="fill-height">
    <v-row>
      <v-col cols="9">
        <div>
          <!--show-->
          <div class="d-flex justify-center ma-3">
            <v-card
                height="600px"
                width="1000px"
            >
              <div>
                <Webcam :room="room"></Webcam>
                <Sharescreen
                    :room="room"
                    :buttonsharescreen="buttonsharescreen"
                ></Sharescreen>
                <video id="video" playsinline autoplay muted></video>
              </div>
            </v-card>
          </div>

          <!--button-->
          <ButtonMenu
              :room_state="room_state"
              @sharescreen="ToggleShareScreen($event)"
              :sharescreenState="sharescreenState"
          ></ButtonMenu>
        </div>
      </v-col>
      <v-col cols="3">
        <template v-if="room_state.state ==='playing'">
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
        </template>
        <template v-if="room_state.state === 'normal'">
          <KeepAlive>
            <component
                class="text-center"
                v-if="room_state.module"
                :is="room_state.module"
                :room="room"
                :classroom-id="classroom_id"
                :member="member"
                @ended="module_end"
            >
            </component>
          </KeepAlive>
        </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ContentHeader from "@/components/share/ContentHeader";
import Chat from "../../components/classroom_modules/chat/Chat";
import ChoiceQuiz from "../../components/classroom_modules/choicequiz/ChoiceQuiz";
import {mapState} from "vuex";
import Attendance from "@/components/classroom_modules/attendance/Attendance";
import GameQuestion from "@/components/classroom_modules/gamequestion/GameQuestion";
import Poll from "@/components/classroom_modules/poll/Poll";
import ParticipantCard from "@/components/classroom/room/ParticipantCard";
import Webcam from "@/components/classroom_modules/web_rtc/Webcam";
import Sharescreen from "@/components/classroom_modules/sharescreen/Sharescreen";
import ButtonMenu from "@/components/classroom/room/ButtonMenu";

export default {
  name: "ClassroomRoom",
  components: {ButtonMenu, Webcam, ParticipantCard, Poll, GameQuestion, Attendance, Chat, ChoiceQuiz, ContentHeader, Sharescreen},
  data() {
    return {
      my_role: null,
      room: null,
      button: [],
      sheet: false,
      member: [],
      classroom_id: this.$route.params.id,
      room_state: {
        state: "normal", // normal $$ playing,
        module: null,   // null && module_name
        host: null
      },
      buttonsharescreen: false,
      shareScreenKey : 0,
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
      user: state => state.user.user,
      sharescreenState :state => state.classroom_modules.web_rtc.sharescreenState
    })
  },
  methods: {
    SwitchChatParticipant() {
      if (this.room_state.module === 'Chat') {
        this.room_state.module = 'ParticipantCard'
      } else {
        this.room_state.module = 'Chat'
      }
    },

    ToggleShareScreen(e){
      this.buttonsharescreen = e
      this.shareScreenKey +=1

    },


    //GE functions
    async loadData() {
      this.room = await this.$store.dispatch('classroom/room/getRoom', this.$route.params.room_id)

      // if (this.room['status'] === false) {
      //   await this.$router.push({name: 'BoardClassroom', params: {id: this.$route.params.id}})
      // }

    },

    async end() {
      await this.$router.push({name: 'BoardClassroom', params: {id: this.$route.params.id}})
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
      this.member = e['data']['member']
      if (e['data']['user']['user'] === this.user.pk) { // is me
        this.my_role = e['data']['user']['role']
      }
    },
    on_member_leave(e) {
      this.member = e['data']['member']
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
      this.room_state.module = 'Chat'
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
      this.room_state.module = this.room_state.module ? this.room_state.module : 'Chat'

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