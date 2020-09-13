<template>
  <div>
    <v-card class="ma-4" color="pink lighten-5">
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
        <v-select
            v-model="question.choice_answer"
            outlined
            hide-details
            dense
            label="Answer"
            :items="items"
            item-text="text"
            item-value="id"
            @change="on_change"
        >
        </v-select>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "YesNoQuestion",
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
    question: null,
    items: [
      {id: true, text: 'Yes'},
      {id: false, text: 'No'},
    ]
  }),
  methods: {
    on_change() {
      this.$emit('input', this.question)
    },
    delete_question() {
      this.$emit('delete')
    },

  }
}
</script>

<style scoped>

</style>