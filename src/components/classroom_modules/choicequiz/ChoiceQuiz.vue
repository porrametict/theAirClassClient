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

import ChoiceQuizSelect from "@/components/classroom_modules/choicequiz/ChoiceQuizSelect";
import ShowQuestion from "@/components/classroom_modules/choicequiz/ShowQuestion";
import WaitAnswer from "@/components/classroom_modules/choicequiz/WaitAnswer";
import Start from "@/components/classroom_modules/choicequiz/Start";
import HostWaitAnswer from "@/components/classroom_modules/choicequiz/HostWaitAnswer";
import HostAnswerResult from "@/components/classroom_modules/choicequiz/HostAnswerResult";
import AnswerResult from "@/components/classroom_modules/choicequiz/AnswerResult";
import Summary from "@/components/classroom_modules/choicequiz/Summary";

export default {
  name: "ChoiceQuiz",
  components: {
    Summary,
    AnswerResult, HostAnswerResult, HostWaitAnswer, Start, WaitAnswer, ShowQuestion, ChoiceQuizSelect
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
      await this.loadData()
    } else {
      this.is_host = false
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
      component_key: 0,
      classroom_module: null,
      state: {
        state: null,
        component: null,
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

      }
      events[e.event](e.data)

    },
    on_choice_quiz_select(e) {
      this.choice_quiz = e
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
      this.on_end_question()
    },

    // main WenSocket
    newWebSocket() {
      let self = this
      this.module_socket = new WebSocket(
          `${window.baseWsURL}/choicequiz/${self.room.room_code}/`
      )
      this.module_socket.onopen = function () {
      }
      this.module_socket.onclose = function (e) {
        console.error('Choice Quiz socket closed unexpectedly', e);
      }
      let commands = {
        'on_new_game': self.on_new_game,
        'on_student_select': self.on_student_select,
        'on_answer': self.on_answer,
        'on_next_question': self.on_next_question,
        'on_end_question': self.on_end_question,
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
    new_game() {
      this.socket_send(
          {
            "command": "new_game",
            "data": {
              "choice_quiz": this.choice_quiz,
            }
          }
      )
    },
    on_new_game(e) {
      if (this.is_host) {
        this.state.state = 'waitAnswer'
        this.state.component = 'HostWaitAnswer'
      } else {
        this.state.state = 'newQuestion'
        this.state.component = 'ShowQuestion'
      }

      this.state.data.choice_quiz = e.data.choice_quiz
      this.state.data.current_question_index = 0
      this.state.data.choice_quizzes = null // clear unused variable
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
        this.state.state = 'waitAnswer'
        this.state.component = 'WaitAnswer'
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
      this.socket_send(
          {
            "command": "answer",
            "data": null
          }
      )
    },
    on_answer(e) {

      if (this.is_host) {
        this.state.component = 'HostAnswerResult'
      } else {
        this.state.component = 'AnswerResult'
      }
      this.state.state = 'AnswerResult'

    },
    next_question() {
      this.socket_send(
          {
            "command": "next_question",
            "data": {
              current_question_index: this.state.data.current_question_index + 1
            }
          }
      )
    },
    on_next_question(e) {
      if (this.is_host) {
        this.state.state = 'waitAnswer'
        this.state.component = 'HostWaitAnswer'
      } else {
        this.state.state = 'newQuestion'
        this.state.component = 'ShowQuestion'
      }
      this.state.data.current_question_index = e.data.current_question_index
      this.component_key += 1

    },
    end_question() {
      this.socket_send(
          {
            "command": "end_question",
            "data": {}
          }
      )

    },
    on_end_question(e) {
      this.state.state = "Summary"
      this.state.component = "Summary"
    }
  }
}
</script>

<style scoped>

</style>