<template>
  <div class="text-center">
    <div>
      <p class="headline green--text">Correct : {{ data.count_current_correct_responders }}</p>
    </div>
    <div>
      <p class="headline red--text">Incorrect : {{ data.count_current_incorrect_responders }}</p>
    </div>
    <div>
      <p class="headline grey--text">Not Answer : {{ data.all_students.length - (data.count_current_incorrect_responders + data.count_current_correct_responders)  }}</p>
    </div>
    <div v-if="data.current_question_index < data.choice_quiz.questions.length -1">
      <ButtonPrimary @click="on_click('next_question')">Next</ButtonPrimary>
    </div>
    <div v-else>
      <ButtonPrimary @click="on_click('end_question')">End</ButtonPrimary>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ButtonPrimary from "@/components/share/ButtonPrimary";

export default {
  name: "HostAnswerResult",
  components: {ButtonPrimary},
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  created() {
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    on_click(e) {
      this.$emit('change', {'event': e})
    }

  }
}
</script>

<style scoped>

</style>