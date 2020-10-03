<template>
  <div>
    <v-card class="ma-4" color="blue lighten-5">
      <v-card-title class="d-flex">
        <v-row>
          <v-col>
            <v-text-field
                class="flex-grow-1"
                v-model="question.text"
                outlined
                hide-details
                :rules="[rules.required]"
                dense
                :label="'Question'"
                @change="on_change"

            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-text-field
                class="flex-shrink-1"
                v-model="question.point"
                outlined
                hide-details
                :rules="[rules.required]"
                dense
                label="score"
                type="number"
                @change="on_change"

            >
            </v-text-field>
          </v-col>

        </v-row>

        <v-btn
            color="red"
            icon
            outlined
            class="ml-2"
            @click="delete_question()"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>


      </v-card-title>
      <v-card-text>
        <div v-for="(c,c_index) in question.choice_set" :key="c_index"
             class="d-flex align-center justify-center">

          <v-row align="center" class="my-2 mx-2">
            <v-checkbox
                color="primary"
                v-model="c.is_answer"
                hide-details
                class="shrink  mt-0"
                @change="on_change"
            />

            <v-text-field
                :label="'Choice '+(c_index+1)"
                v-model="c.text"
                append-outer-icon="mdi-close"
                outlined
                dense
                :rules="[rules.required]"
                hide-details
                @click:append-outer="delete_choice(c_index)"
                @change="on_change"
            />
          </v-row>
        </div>
        <div class="mx-2">
          <v-btn color='grey lighten-1'
                 class="white--text"
                 block
                 @click="add_choice"
                 v-if="question.choice_set.length <10"
          >
            Add Choice
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "MultiChoiceQuestion",
  props: {
    value: {
      type: [Object],
      require: true
    },
  },
  created() {
    this.question = this.value
  },
  data: () => ({
    rules: {
      required: value => !!value || 'Required.',
    },
    question: null
  }),
  methods: {
    on_change() {
      this.$emit('input', this.question)
    },
    add_choice() {
      this.question.choice_set.push({
        text: null,
        is_answer: false
      })
    },
    delete_choice(choice_index) {
      if (this.question.choice_set.length > 2) {
        this.question.choice_set.splice(choice_index, 1)
      }
      this.on_change()
    },
    delete_question() {
      this.$emit('delete')
    },

  }
}
</script>

<style scoped>

</style>