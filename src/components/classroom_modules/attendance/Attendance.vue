<template>
  <v-card class="fill-height" outlined>
    <v-card-title class="ma-0 pa-2">
      <slot>
        Attendance Check
      </slot>
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text v-if="state.component">

      <div v-if="is_host" class="text-center">
        student(s) : {{ state.data.present_student_count }} / {{ state.data.all_students.length }}
        <div v-for="student in state.data.all_students">
          <p class="title" :class="{'green--text': student['present']  ,'red--text' : !student['present'] }">
            {{ student.user_data.first_name }}
            {{ student.user_data.last_name }}</p>
        </div>
        <br/>
        <v-btn rounded color="blue" class="white--text" @click="end_attendance">
          end ATTENDANCE
        </v-btn>
      </div>


      <div v-else-if="is_viewer" class="text-center title">
        student(s) : {{ state.data.present_student_count }} / {{ state.data.all_students.length }}
      </div>


      <div v-else class="text-center">
        <p class="title">คลิกเพื่อเช็คชื่อ</p>
        <v-btn rounded color="blue" class="white--text" @click="go_attendance">
          ATTENDANCE
        </v-btn>
      </div>

    </v-card-text>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import moment from "moment";

export default {
  name: "Attendance",
  props: {
    host: {
      type: [Object],
      require: true
    },
    room: {
      type: [Object],
      require: true
    },
    role: {
      type: [Number],
      require: true
    },
  }, async mounted() {
    this.newWebSocket()
    if (this.user.pk === this.host.pk) {
      this.is_host = true
      this.state.state = 'start'
      this.state.component = 'HostStart'

    } else if (this.role <= 2) { // is teacher or owner
      this.is_viewer = true
      this.state.state = 'start'
      this.state.component = 'ViewerStart'

      this.end_attendance()

    } else {
      this.state.state = 'start'
      this.state.component = 'Start'
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  data() {
    return {
      is_host: false,
      is_viewer: false,
      component_key: 0,
      classroom_module: null,
      state: {
        state: 'start',
        component: null,
        data: {
          room: null,
          all_students: [],
        }
      }
    }
  },
  methods: {
    // main WenSocket
    newWebSocket() {
      let self = this
      this.module_socket = new WebSocket(
          `${window.baseWsURL}/attendance/${self.room.room_code}/`
      )
      this.module_socket.onopen = function () {
        self.get_current_state()
      }
      this.module_socket.onclose = function (e) {
        console.error('Attendant socket closed unexpectedly', e);
      }
      let commands = {
        'on_get_current_state': self.on_get_current_state,
        'on_attendance': self.on_attendance,
      }
      this.module_socket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let command = data['command']
        console.log(command)
        commands[command](data)
      }
    },
    socket_send(data) {
      this.module_socket.send(JSON.stringify(data));
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
    async on_get_current_state(e) {
      this.state = e['data']['state']
      this.state['component'] = this.get_component_by_state(this.state)


      if (!this.is_viewer && !this.is_viewer) {
        this.check_attended()
      }

    },
    check_attended() {
      this.state.data.all_students.forEach(e => {
        if (e.student === this.user.pk) {
          if (e.present) {
            this.end_attendance()
          }
        }
      })

    },
    get_component_by_state(state, component_index = 0) {
      let state_name = state.state
      let component = null
      if (this.is_host) {
        component = state['component_set']['host'][state_name][component_index]
      } else if (this.is_viewer) {
        component = state['component_set']['viewer'][state_name][component_index]
      } else {
        component = state['component_set']['student'][state_name][component_index]
      }
      return component
    },
    go_attendance() {
      this.socket_send(
          {
            "command": "go_attendance",
            "data": {
              "user": this.user,
            }
          }
      )
      this.end_attendance()
    },
    on_attendance(e) {
      this.state.data = e.data.state.data
    },
    end_attendance() {
      if (this.is_host) {
        moment.locale('th')
        this.state.data.name = `เช็คชื่อ ${moment().format('lll')}`
        this.socket_send(
            {
              "command": "save_attendance",
              "data": {
                "state": this.state,
              }
            }
        )
      }
      this.$emit(
          'ended', {event: 'attendance'}
      )
    }


  }
}
</script>

<style scoped>

</style>