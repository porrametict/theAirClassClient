<template>
  <v-card class="fill-height" outlined>
    <v-card-title class="ma-0 pa-2">
      <slot>
        Question
      </slot>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text v-if="state.component">
      <component
          :is="state.component"
          :data="state.data"
          @change="eventChange"
          :key="component_key"
          :room="room"
      ></component>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
import HostStart from "@/components/classroom_modules/gamequestion/host/HostStart";
import Start from "@/components/classroom_modules/gamequestion/student/Start";
import ViewerStart from "@/components/classroom_modules/gamequestion/viewer/ViewerStart";
import HostShowQuestion from "@/components/classroom_modules/gamequestion/host/HostShowQuestion";
import ShowQuestion from "@/components/classroom_modules/gamequestion/student/ShowQuestion";
import ViewerShowQuestion from "@/components/classroom_modules/gamequestion/viewer/ViewerShowQuestion";
import HostAnswer from "@/components/classroom_modules/gamequestion/host/HostAnswer";
import Answer from "@/components/classroom_modules/gamequestion/student/Answer";
import ViewerAnswer from "@/components/classroom_modules/gamequestion/viewer/ViewerAnswer";
import HostWaitResponder from "@/components/classroom_modules/gamequestion/host/HostWaitResponder";
import ViewerWaitResponder from "@/components/classroom_modules/gamequestion/viewer/ViewerWaitResponder";
import GameClick from "@/components/classroom_modules/gamequestion/student/GameClick";

export default {
  name: "GameQuestion",
  components: {
    GameClick,
    ViewerWaitResponder,
    HostWaitResponder,
    ViewerAnswer,
    Answer, HostAnswer, ViewerShowQuestion, ShowQuestion, HostShowQuestion, ViewerStart, Start, HostStart
  },
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
    console.log(this.user, this.role)
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
        'component_set': {
          'host': {
            'start': ['HostStart'],
            'new_question': ['HostShowQuestion'],
            'select_responder': ['HostWaitResponder'],
            'get_responder': ['HostAnswer'],
          },
          'student': {
            'start': ['Start'],
            'new_question': ['ShowQuestion'],
            'select_responder': ['GameClick'],
            'get_responder': ['Answer'],
          },
          'viewer': {
            'start': ['ViewerStart'],
            'new_question': ['ViewerShowQuestion'],
            'select_responder': ['ViewerWaitResponder'],
            'get_responder': ['ViewerAnswer'],
          },
        },
        data: {
          question: null,
          student: null,
          is_true: null
        }
      }
    }
  },
  methods: {

    eventChange(e) {

      let events = {
        'new_question': this.new_question,
        'show_question': this.on_show_question,
        'game_click': this.on_game_click_end,
        'get_answer': this.on_get_answer,
      }
      events[e.event](e.data)

    },
    on_show_question() {
      this.select_responder()
    },
    on_game_click_end(e) {
      if (e && e.pk) {
        this.state.data.student = e
        this.get_responder()
      }
    },
    on_get_answer(e) {
      this.state.data.is_true = e.result
      this.end_gamequestion()
    },


    // main WenSocket
    newWebSocket() {
      let self = this
      this.module_socket = new WebSocket(
          `${window.baseWsURL}/gamequestion/${self.room.room_code}/`
      )
      this.module_socket.onopen = function () {
        self.get_current_state()
      }
      this.module_socket.onclose = function (e) {
        console.error('Attendant socket closed unexpectedly', e);
      }
      let commands = {
        'on_get_current_state': self.on_get_current_state,
        'on_new_question': self.on_new_question,
        'on_select_responder': self.on_select_responder,
        'on_get_responder': self.on_get_responder,
        'on_end_gamequestion': self.on_end_gamequestion,
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
      let state = e['data']['state']
      state['component'] = this.get_component_by_state(state)
      this.state = state
      this.component_key += 1
      console.log(this.state)
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


    new_question(e) {
      this.state.data.question = e
      this.state.state = 'new_question'

      let content = {
        "command": "new_question",
        "data": {
          "state": this.state,
        }
      }
      this.socket_send(content);
    },
    on_new_question(e) {
      this.state = e['data']['state']
      this.state.component = this.get_component_by_state(this.state)
      this.component_key += 1

    },
    select_responder() {
      this.state.state = "select_responder"
      let content = {
        "command": "select_responder",
        "data": {
          "state": this.state,
        }
      }
      this.socket_send(content);
    },
    on_select_responder(e) {
      this.state = e['data']['state']
      this.state.component = this.get_component_by_state(this.state)
      this.component_key += 1
    },
    get_responder() {
      this.state.state = "get_responder"
      let content = {
        "command": "get_responder",
        "data": {
          "state": this.state,
        }
      }
      this.socket_send(content);
    },
    on_get_responder(e) {
      console.log("get responder")
      this.state = e['data']['state']
      this.state.component = this.get_component_by_state(this.state)
      this.component_key += 1
    },
    end_gamequestion() {
      let content = {
        "command": "end_gamequestion",
        "data": {
          "state": this.state,
        }
      }
      this.socket_send(content);

    },
    on_end_gamequestion(e) {
      this.$emit(
          'ended', {event: 'game_question'}
      )
    }


  }
}
</script>

<style scoped>

</style>