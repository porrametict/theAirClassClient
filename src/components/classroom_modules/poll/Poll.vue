<template>
  <v-card class="fill-height" outlined>
    <v-card-title class="ma-0 pa-2">
      <slot>
        Poll
      </slot>
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text v-if="state.component">
      <component
          :is="state.component"
          :data="state.data"
          @change="eventChange"
          :key="component_key"
      ></component>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import HostStart from "@/components/classroom_modules/poll/host/HostStart";
import Start from "@/components/classroom_modules/poll/student/Start";
import ViewerStart from "@/components/classroom_modules/poll/viewer/ViewerStart";
import ShowQuestion from "@/components/classroom_modules/poll/student/ShowQuestion";
import HostShowQuestion from "@/components/classroom_modules/poll/host/HostShowQuestion";
import ViewerShowQuestion from "@/components/classroom_modules/poll/viewer/ViewerShowQuestion";
import ShowResult from "@/components/classroom_modules/poll/student/ShowResult";

export default {
  name: "poll",
  components: {ShowResult, ViewerShowQuestion, HostShowQuestion, ShowQuestion, ViewerStart, Start, HostStart},
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
          'classroom': null,
          'room': null,
          'all_students': null,
          'question': null,
        }
      }
    }
  },
  methods: {
    // Event functions
    eventChange(e) {

      let events = {
        'new_question': this.on_new_question_event,
        'student_select': this.on_student_select_event,
        'end_question': this.on_end_question_event,
        'close_poll': this.on_close_poll_event,

      }
      events[e.event](e.data)

    },
    on_new_question_event(e) {
      this.new_question(e)
    }, on_student_select_event(e) {
      this.student_reply(e)
    }, on_end_question_event(e) {
      this.end_poll()
    }, on_close_poll_event(e) {
      this.$emit(
          'ended', {event: 'poll'}
      )
    },
    // main WenSocket
    newWebSocket() {
      let self = this
      this.module_socket = new WebSocket(
          `${window.baseWsURL}/poll/${self.room.room_code}/`
      )
      this.module_socket.onopen = function () {
        self.get_current_state()
      }
      this.module_socket.onclose = function (e) {
        if (e.code !== 1000) {
          console.log('Poll socket closed ', e);
        }
      }
      let commands = {
        'on_get_current_state': self.on_get_current_state,
        'on_new_question': self.on_new_question,
        'on_student_rely': self.on_student_rely,
      }
      this.module_socket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let command = data['command']
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
      if (!e['data']['state']['data']['all_students']) {
        this.get_current_state()
      }
      this.state = e['data']['state']

      let component_index = 0

      if (!this.is_host && !this.is_viewer && this.state.state === 'new_question') {

        if (this.check_replied()) {
          component_index = 1

        }

      }
      this.state['component'] = this.get_component_by_state(this.state, component_index)
      this.component_key += 1

    },
    new_question(question) {
      this.state.state = 'new_question'
      this.socket_send(
          {
            "command": "new_question",
            "data": {
              "question": question,
            }
          }
      )
    },
    on_new_question(e) {
      this.state = e['data']['state']
      this.state['component'] = this.get_component_by_state(this.state)
      this.component_key += 1

    },
    student_reply(e) {
      this.socket_send(
          {
            "command": "student_rely",
            "data": {
              "choice_select": e,
              "user": this.user
            }
          }
      )
    },
    on_student_rely(e) {
      this.state = e['data']['state']

      let component_index = 0

      if (!this.is_host && !this.is_viewer && this.state.state === 'new_question') {

        if (this.check_replied()) {
          component_index = 1
        }

      }
      this.state['component'] = this.get_component_by_state(this.state, component_index)
      this.component_key += 1

    },
    check_replied() {
      let is_reply = false
      this.state.data.all_students.forEach(e => {
        if (e.student === this.user.pk && e.is_reply) {
          is_reply = true
        }
      })
      return is_reply

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
    end_poll() {
      if (this.is_host) {
        this.socket_send(
            {
              "command": "save_poll",
              "data": {
                "state": this.state,
              }
            }
        )
      }
      this.$emit(
          'ended', {event: 'poll'}
      )
    },

  },
  destroyed() {
    if (this.module_socket) {
      this.module_socket.close(1000)
    }
  },


}
</script>

<style scoped>

</style>