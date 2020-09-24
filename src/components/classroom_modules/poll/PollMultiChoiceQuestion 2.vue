<template>
  <div>
    <v-text-field v-model="question.text" outlined label="question" @change="on_change" hide-details class="my-1">
    </v-text-field>
    <div v-for="(choice,index) in question.choice_set" :key="index" class="d-flex">
      <v-text-field v-model="choice.text" dense outlined hide-details :label="'choice ' + (index+1)" @change="on_change"
                    :append-outer-icon="question.choice_set.length > 2 ?  'mdi-close' : ''"
                    @click:append-outer="delete_choice(index)"
                    class="pa-0 mx-0 my-1">
      </v-text-field>
    </div>
    <div>
      <v-btn tile color="blue" class="white--text mx-1 my-2  pa-0" @click="add_choice" block>add choice</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "PollMultiChoiceQuestion",
  props: {
    value: {
      type: Object,
      require: false,
      default: {
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
    }
  }
  ,
  data: () => ({
    question: {}
  }),
  created() {
    this.question = this.value
  }
  ,
  methods: {
    delete_choice(index) {
      this.question.choice_set.slice(index, 1)
    },
    add_choice() {
      this.question.choice_set.push({
        text: '',
        is_answer: false
      })
    },
    on_change() {
      this.$emit('input', this.question)
    }
  }
}
</script>

<style scoped>

</style>