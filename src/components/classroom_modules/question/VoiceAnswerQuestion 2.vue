<template>
  <div>
    <v-text-field
        label="Question"
        outlined
        v-model="question.text"
        @input="$emit('input',question)"
    >
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "VoiceAnswerQuestion",
  props: {
    value: {
      type: Object,
      require: false,
      default: {
        text : null
      }
    }
  },
  created() {
    this.question = this.value
  },
  data: () => ({
    question: {
      text: null
    }
  })
}
</script>

<style scoped>

</style>