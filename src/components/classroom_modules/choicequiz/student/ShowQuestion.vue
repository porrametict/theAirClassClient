<template>
  <div class="">
    <p>Question : </p>
    <component :is="`${choice_quiz.questions[data.current_question_index].resourcetype}Show`"
               :question="choice_quiz.questions[data.current_question_index]"
               @change="on_select"
    />

  </div>
</template>

<script>
import MultiChoiceQuestionShow from "@/components/classroom_modules/question/MultiChoiceQuestionShow";
import YesNoQuestionShow from "@/components/classroom_modules/question/YesNoQuestionShow";

export default {
  name: "ShowQuestion",
  components: {YesNoQuestionShow, MultiChoiceQuestionShow},
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  created() {
    this.choice_quiz = this.data.choice_quiz
  },
  data() {
    return {
      choice_quiz: null,
    }
  },
  methods: {
    on_select(item) {
      this.$emit('change', {'event': 'select_choice', 'data': item})
    },

  }
}
</script>

<style scoped>

</style>