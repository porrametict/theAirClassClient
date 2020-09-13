<template>
  <div>
    <p>Question</p>
    <multi-choice-question-show :question="data.question"
    @change="on_change"></multi-choice-question-show>


  </div>
</template>

<script>
import MultiChoiceQuestionShow from "@/components/classroom_modules/question/MultiChoiceQuestionShow";
export default {
  name: "ShowQuestion",
  components: {MultiChoiceQuestionShow},
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  methods : {
    on_change(e) {
      this.$emit('change', {'event': 'student_select', 'data': e})
    }

  }
}
</script>

<style scoped>

</style>