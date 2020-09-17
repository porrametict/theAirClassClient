<template>
  <div>
    <h1 class="mb-2">Create Question</h1>
    <VoiceAnswerQuestion v-model="question"></VoiceAnswerQuestion>

    <v-btn
        @click="on_click"
        color="primary"
        rounded
        block
        large
    >
      next
    </v-btn>
  </div>
</template>

<script>
import VoiceAnswerQuestion from "@/components/classroom_modules/question/VoiceAnswerQuestion";

export default {
  name: "HostStart",
  components: {VoiceAnswerQuestion},
  data() {
    return {
      question: {
        text: null
      }
    }
  },
  methods: {
    on_click() {
      this.question.text = this.question.text ? this.question.text : 'คำถามปากเปล่า'
      this.$emit('change', {'event': 'new_question', 'data': this.question})
    }
  }
}
</script>

<style scoped>

</style>