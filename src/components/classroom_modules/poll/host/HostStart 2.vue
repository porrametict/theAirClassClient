<template>
  <div>
    <PollMultiChoiceQuestion v-model="question">
    </PollMultiChoiceQuestion>
    <v-btn @click="on_change" rounded large block color="primary" class="my-2">
      start
    </v-btn>
  </div>

</template>

<script>
import PollMultiChoiceQuestion from "@/components/classroom_modules/poll/PollMultiChoiceQuestion";

export default {
  name: "HostStart",
  components: {PollMultiChoiceQuestion},
  data: () => ({
    question: {
      text: '',
      point: 0,
      choice_set: [
        {
          text: '',
          is_answer: false
        },
        {
          text: '',
          is_answer: false
        },
      ]
    }
  }),
  methods: {
    on_change() {
      this.$emit('change', {'event': 'new_question', 'data': this.question})
    }
  }
}
</script>

<style scoped>

</style>