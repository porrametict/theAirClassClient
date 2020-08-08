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
        <component
            v-if="room_state.module"
            :is="room_state.module"
            :room="room"
            :classroom_modules="classroom_modules"
            :role="my_role"
            :host="room_state.host"
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

export default {
  name: "ClassroomRoom",
  components: {Chat, ScreenSharing, ChoiceQuiz},
  data() {
    return {
      my_role: null,
      room: null,
      member: [],
      classroom_modules: [],
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
      await this.getClassroomModules()
    },
    async getClassroomModules() {
      let classroom_modules = await this.$store.dispatch('classroom_modules/classroom_module/getListClassroomModule', {classroom__id: this.classroom_id})
      let cm_data = classroom_modules.results
      for (let i = 0; i < cm_data.length; i++) {
        let data = {
          classroom_module_id: cm_data[i]['id'],
          module_name: cm_data[i]['module']['name']
        }
        this.classroom_modules.push(data)
      }
    },
    async end() {
      this.room['status'] = false
      let data = await this.$store.dispatch('classroom/room/updateRoom', this.room)
      if (data && data['status'] === false) {
        await this.$router.push({name: 'BoardClassroom', params: {id: this.$route.params.id}})
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

      }
      this.room_socket.onclose = function (e) {
        console.error('Room socket closed unexpectedly', e);
      }
      let commands = {
        'on_new_action': self.on_new_action,
        'on_member_join': self.on_member_join,
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
      this.member.push(e['data'])
      if (e['data']['user'] === this.user.pk) { // is me
        this.my_role = e['data']['role']
      }
    },
    new_action(module_name) {
      let content = {
        "command": "new_action",
        "data": {
          "module": module_name,
          "host": this.user
        }
      }
      this.socket_send(content);
    },
    on_new_action(e) {
      this.room_state.state = "playing"
      this.room_state.module = e.data.module
      this.room_state.host = e.data.host
    },

  }
}
</script>

<style scoped>

</style>