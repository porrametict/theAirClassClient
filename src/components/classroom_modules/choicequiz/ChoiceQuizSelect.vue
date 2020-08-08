<template>
  <div>
    <v-card class="ma-2" v-for="(item,index) in choice_quizzes" :key="index">
      <v-card-text>
        <div>
          <div class="text-center title">
            {{ item.name }}
          </div>
          <div class="text-center">
            <ButtonPrimary
                @click="selectedChoiceQuiz = item"
                :color="selectedChoiceQuiz && selectedChoiceQuiz.id  === item.id ? 'primary' : 'grey lighten-2' "
            >Select
            </ButtonPrimary>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <div class="text-center">
      <ButtonPrimary @click="on_start">Start</ButtonPrimary>
    </div>
  </div>
</template>

<script>
import ButtonPrimary from "@/components/share/ButtonPrimary";

export default {
  name: "ChoiceQuizSelect",
  components: {ButtonPrimary},
  props: {
    data: {
      type: [Object],
      require: true
    },
  },
  created() {
    this.choice_quizzes = this.data.choice_quizzes
  },
  data() {
    return {
      choice_quizzes: null,
      selectedChoiceQuiz: null
    }
  },
  methods: {
    on_start() {
      this.$emit('change', {'event': 'choice_quiz_select', 'data': this.selectedChoiceQuiz})
    }

  }
}
</script>

<style scoped>

</style>