<template>
  <v-card class="fill-height" outlined>
    <v-card-title class="ma-0 pa-2">
      <slot>
        Choice Quiz
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
    classroom_modules: {
      type: [Array],
      require: true
    },
  },
  async mounted() {
    this.getClassroomModule()
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
          choice_quizzes: null,
          choice_quiz: null,
          current_question_index: null,
          choice_students: []
        }
      }
    }
  },
  methods: {
    // general functions
    getClassroomModule() {
      let module_name = "ChoiceQuiz"
      this.classroom_modules.forEach((o) => {
        if (o.module_name === module_name) {
          this.classroom_module = o
        }
      })
    },
    async loadData() {
      let data = await this.$store.dispatch('classroom_modules/choicequiz/getChoiceQuizzes', {'classroom_module__id': this.classroom_module.classroom_module_id})

      this.state.data.choice_quizzes = data.results
      this.state.state = 'start'
      this.state.component = 'ChoiceQuizSelect'
    },

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
        console.error('Choice Quiz socket closed unexpectedly', e);
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
      let state = e['data']['state']
      state['component'] = this.get_component_by_state(state)
      this.state = state

      if (this.is_host) {
        await this.loadData()
      }
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
      console.log(e)
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
      if (!this.is_host) {
        if (e.data.user.pk === this.user.pk) {
          this.state.state = 'newQuestion'
          this.state.component = 'WaitAnswer'
        }
      }

      if (this.state.data.choice_students.length > 0) {

        let choice_students = this.state.data.choice_students
        let have_current_question = false

        choice_students.forEach((o) => {

          if (o.question.id === this.state.data.choice_quiz.question_set[this.state.data.current_question_index]) {  //question == current_question
            have_current_question = true
            o.choice_selects.push(e.data)
          }

        })

        if (!have_current_question) {   // don't have current question
          let data = {
            question: this.state.data.choice_quiz.question_set[this.state.data.current_question_index],
            choice_selects: [e.data]
          }
          this.state.data.choice_students.push(data)
        }

      } else {   // empty list
        let data = {
          question: this.state.data.choice_quiz.question_set[this.state.data.current_question_index],
          choice_selects: [e.data]
        }
        this.state.data.choice_students.push(data)
      }
      this.component_key += 1

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
              'classroom_module' : this.classroom_module
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
      this.state = {
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
          choice_quizzes: null,
          choice_quiz: null,
          current_question_index: null,
          choice_students: []
        }
      }
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
  }
}
</script>

<style scoped>

</style>