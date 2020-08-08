<template>
  <div class="text-center">
    <div>
      <p>count responder</p>
      <p class="title">
        {{count_answer}}
      </p>
    </div>
    <p class="headline">Please wait..</p>
  </div>
</template>

<script>
export default {
  name: "WaitAnswer",
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  created() {
    this.countAnswer()
  },
  data() {
    return {
      count_answer: 0
    }
  },
  methods: {
    countAnswer() {
      this.data.choice_students.forEach((o) => {
        if (o.question.id === this.data.choice_quiz.question_set[this.data.current_question_index].id) {  //question == current_question
          this.count_answer = o.choice_selects.length
        }
      })
    }
  }
}
</script>

<style scoped>

</style>