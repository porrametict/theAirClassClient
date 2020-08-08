<template>
  <div>
    <p class="headline">
      {{ choice_quiz.question_set[data.current_question_index].text }}
    </p>

    <div class="ma-1"
        v-for="(item,index) in choice_quiz.question_set[data.current_question_index].choice_set"
        :key="index"
    >
      <v-hover
          v-slot:default="{ hover }"
      >
        <v-card
            :color="hover? 'primary' : 'white'"
            style="cursor: pointer"
            @click="on_select(item.id)"
        >
          <v-card-text class="pa-2 ma-0  d-flex justify-center align-center">
            <p class="title text-center ma-0 pa-0">
              {{ item.text }}
            </p>
          </v-card-text>
        </v-card>
      </v-hover>
    </div>

  </div>
</template>

<script>
export default {
  name: "ShowQuestion",
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