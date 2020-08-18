<template>
  <div class="text-center">
    <div v-if="result === true">
      <p class="headline green--text">Correct</p>
    </div>
    <div v-else-if="result === false">
      <p class="headline red--text">Incorrect</p>
    </div>
    <div v-else-if="result === null">
      <p class="headline grey--text">Did not answer</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "AnswerResult",
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
      result: null
    }
  },
  methods: {
    getResult() {

      this.data.choice_students.forEach((o) => {
        if (o.question.id === this.data.choice_quiz.question_set[this.data.current_question_index].id) {  //question == current_question

          o.choice_selects.forEach((c) => {
            if (c.user.pk === this.user.pk) {  /// is me

              o.question.choice_set.forEach((cs) => {

                if (c.choice_select === cs.id) { //is selected choice
                  this.result = cs.is_true
                }
              })
            }
          })
        }
      })
    },

  }
}
</script>

<style scoped>

</style>