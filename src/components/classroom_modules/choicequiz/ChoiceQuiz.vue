<template>
  <v-card class="fill-height" outlined>
    <v-card-title class="ma-0 pa-2">
      <slot>
         Quiz
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

import ChoiceQuizSelect from "@/components/classroom_modules/choicequiz/host/ChoiceQuizSelect";
import ShowQuestion from "@/components/classroom_modules/choicequiz/student/ShowQuestion";
import WaitAnswer from "@/components/classroom_modules/choicequiz/student/WaitAnswer";
import Start from "@/components/classroom_modules/choicequiz/student/Start";
import HostWaitAnswer from "@/components/classroom_modules/choicequiz/host/HostWaitAnswer";
import HostAnswerResult from "@/components/classroom_modules/choicequiz/host/HostAnswerResult";
import AnswerResult from "@/components/classroom_modules/choicequiz/student/AnswerResult";
import Summary from "@/components/classroom_modules/choicequiz/student/Summary";
import HostSummary from "@/components/classroom_modules/choicequiz/host/HostSummary";
import ViewerAnswerResult from "@/components/classroom_modules/choicequiz/viewer/ViewerAnswerResult";
import ViewerStart from "@/components/classroom_modules/choicequiz/viewer/ViewerStart";
import ViewerWaitAnswer from "@/components/classroom_modules/choicequiz/viewer/ViewerWaitAnswer";
import ViewerSummary from "@/components/classroom_modules/choicequiz/viewer/ViewerSummary";

export default {
  name: "ChoiceQuiz",
  components: {
    ViewerSummary,
    ViewerWaitAnswer,
    ViewerStart,
    ViewerAnswerResult,
    HostSummary,
    Summary,
    AnswerResult,
    HostAnswerResult,
    HostWaitAnswer,
    Start,
    WaitAnswer,
    ShowQuestion,
    ChoiceQuizSelect
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
  },
  async mounted() {
    this.newWebSocket()
    if (this.user.pk === this.host.pk) {
      this.is_host = true
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
            'start': ['ChoiceQuizSelect'],
            'newQuestion': ['HostWaitAnswer'],
            'AnswerResult': ['HostAnswerResult'],
            'Summary': ['HostSummary'],
          },
          'student': {
            'start': ['Start'],
            'newQuestion': ['ShowQuestion', 'WaitAnswer'],
            'AnswerResult': ['AnswerResult'],
            'Summary': ['Summary'],
          },
          'viewer': {
            'start': ['ViewerStart'],
            'newQuestion': ['ViewerWaitAnswer'],
            'AnswerResult': ['ViewerAnswerResult'],
            'Summary': ['ViewerSummary'],
          },

        },
        data: {
          'classroom': null,
          'room': null,
          'all_students': null,
          'student_replies': null,
          'question_replies': null,
          'choice_quizzes': null,
          'choice_quiz': null,
          'current_question_index': null,
        }
      }
    }
  },
  methods: {
    // general functions

    // Event functions
    eventChange(e) {

      let events = {
        'choice_quiz_select': this.on_choice_quiz_select,
        'select_choice': this.on_select_choice,
        'answer': this.on_answer_event,
        'next_question': this.on_next_question_event,
        'end_question': this.on_end_question_event,
        'end_choice_quiz': this.on_end_choice_quiz_event,

      }
      events[e.event](e.data)

    },
    on_choice_quiz_select(e) {
      this.state.data.choice_quiz = e
      this.new_game()
    },
    on_select_choice(e) {
      let data = {
        choice_select: e,
        user: this.user
      }
      this.student_select(data)
    },
    on_answer_event() {
      this.answer()
    },
    on_next_question_event() {
      this.next_question()
    },
    on_end_question_event() {
      this.end_question()
    },
    on_end_choice_quiz_event() {
      this.end_choice_quiz()
    },

    // main WenSocket
    newWebSocket() {
      let self = this
      this.module_socket = new WebSocket(
          `${window.baseWsURL}/choicequiz/${self.room.room_code}/`
      )
      this.module_socket.onopen = function () {
        self.get_current_state()
      }
      this.module_socket.onclose = function (e) {
        if (e.code !== 1000) {
          console.log('Choice Quiz socket closed ', e);
        }
      }
      let commands = {
        'on_get_current_state': self.on_get_current_state,
        'on_new_game': self.on_new_game,
        'on_student_select': self.on_student_select,
        'on_answer': self.on_answer,
        'on_next_question': self.on_next_question,
        'on_end_question': self.on_end_question,
        'on_end_choice_quiz': self.on_end_choice_quiz,
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

    // WebSocket functions
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
        return;
      }
      let state = e['data']['state']
      if (!state['data']['choice_quizzes']) {
        this.get_current_state()
        return;
      }
      let component_index = 0
      if (state['state'] === 'newQuestion' && this.role === 3) {
        component_index = this.student_replied() ? 1 : 0
      }
      state['component'] = await this.get_component_by_state(state, component_index)
      this.state = state
      this.component_key += 1

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
    new_game() {
      this.state.state = 'newQuestion'
      this.state.data.current_question_index = 0

      this.socket_send(
          {
            "command": "new_game",
            "data": {
              "state": this.state,
            }
          }
      )
    },
    on_new_game(e) {
      this.state = e['data']['state']
      this.state.component = this.get_component_by_state(this.state)
      this.component_key += 1
    },
    student_select(e) {
      this.socket_send(
          {
            "command": "student_select",
            "data": e
          }
      )
    },
    on_student_select(e) {
      this.state = e['data']['state']
      if (!this.is_host && !this.is_viewer) {
        if (this.student_replied()) {
          this.state.state = 'newQuestion'
          this.state.component = this.get_component_by_state(this.state, 1)
        }else {
          this.state.state = 'newQuestion'
          this.state.component = this.get_component_by_state(this.state)
        }
      } else {
        console.log('else')
        this.state.component = this.get_component_by_state(this.state)
      }
    },
    student_replied() {
      let replied = false
      let current_question_index = this.state.data.current_question_index
      this.state.data.question_replies[current_question_index].students.forEach(e => {
        if ((e.student === this.user.pk) && e.is_reply) {
          replied = true
        }
      })
      return replied
    },
    answer() {
      this.state.state = 'AnswerResult'
      this.socket_send(
          {
            "command": "answer",
            "data": {
              'state': this.state
            }
          }
      )
    },
    on_answer(e) {

      this.state = e['data']['state']
      this.state.component = this.get_component_by_state(this.state)
      this.component_key += 1

    },
    next_question() {
      this.state.state = 'newQuestion'
      this.state.data.current_question_index += 1
      this.socket_send(
          {
            "command": "next_question",
            "data": {
              'state': this.state
            }
          }
      )
    },
    on_next_question(e) {
      this.state = e['data']['state']
      this.state.component = this.get_component_by_state(this.state)
      this.component_key += 1

    },
    end_question() {
      this.state.state = "Summary"
      this.socket_send(
          {
            "command": "end_question",
            "data": {
              'state': this.state,
              'classroom_module': this.classroom_module
            }
          }
      )

    },
    on_end_question(e) {
      this.state = e['data']['state']
      this.state.component = this.get_component_by_state(this.state)
      this.component_key += 1

    },
    end_choice_quiz() {

      this.socket_send(
          {
            "command": "end_choice_quiz",
            "data": {
              'state': this.state
            }
          }
      )
    },
    on_end_choice_quiz(e) {
      this.$emit(
          'ended', {event: 'choice_quiz'}
      )
    }
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