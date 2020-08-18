<template>
  <div class="text-center">
    <div>
      <p>count responder</p>
      <p class="title">
        {{count_answer}}
      </p>
    </div>
    <div>
      <ButtonPrimary @click="on_click">Answer</ButtonPrimary>
    </div>
  </div>
</template>

<script>
import ButtonPrimary from "@/components/share/ButtonPrimary";
export default {
  name: "HostWaitAnswer",
  components: {ButtonPrimary},
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
          this.count_answer += 1
        }
      })
    },
    on_click() {
      this.$emit('change', {'event': 'answer'})
    },
  }
}
</script>

<style scoped>

</style>