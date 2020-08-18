<template>
  <div class="text-center">
    <div>
      <p class="headline green--text">Correct : {{ correct_count }}</p>
    </div>
    <div>
      <p class="headline red--text">Incorrect : {{ incorrect_count }}</p>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "ViewerAnswerResult",
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  created() {
    this.getResult()
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  data() {
    return {
      correct_count: 0,
      incorrect_count : 0,
      count_answer: 0,
    }
  },
  methods: {
    getResult() {

      this.data.choice_students.forEach((o) => {
        if (o.question.id === this.data.choice_quiz.question_set[this.data.current_question_index].id) {  //question == current_question

          o.choice_selects.forEach((c) => {
            let answer_true = false
            o.question.choice_set.forEach((cs) => {

              if (c.choice_select === cs.id && cs.is_true) { //is selected choice and true
                answer_true = true
              }
            })

            if(answer_true){
              this.correct_count++
            }else {
              this.incorrect_count++
            }
          })
          this.count_answer = o.choice_selects.length
        }
      })
    },
    countAnswer() {
      this.data.choice_students.forEach((o) => {
        if (o.question.id === this.data.choice_quiz.question_set[this.data.current_question_index].id) {  //question == current_question
          this.count_answer += 1
        }
      })
    },
    on_click(e) {
      this.$emit('change', {'event': e})
    }

  }
}
</script>

<style scoped>

</style>