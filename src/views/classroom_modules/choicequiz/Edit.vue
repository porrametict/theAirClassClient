<template>
  <div>
    <ContentHeader class="my-2">Edit : Choice Quiz</ContentHeader>
    <v-card>
      <v-card-title>
        <!-- Name -->
        <v-text-field
            label="name"
            outlined
            dense
            v-model="form.name"
            :rules="[rules.required]"
        >
        </v-text-field>
      </v-card-title>
      <v-card-text>
        <div v-for="(q,q_index) in form.questions" :key="q_index">
          <component
              :is="q.resourcetype"
              v-model="form.questions[q_index]"
              @delete="delete_question(q_index)"
          ></component>
        </div>
        <div>
          <div>
            <div class="ma-4 d-flex flex-row justify-space-around">
              <v-btn color='pink' large class="white--text" @click="add_question('YesNoQuestion')">
                Add Yes No Question
              </v-btn>
              <v-btn color='blue' large class="white--text"
                     @click="add_question('MultiChoiceQuestion')">
                Add Choice Question
              </v-btn>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="text-center">
        <v-btn large @click="save" color="primary" block class="black--text">SAVE</v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import ContentHeader from "../../../components/share/ContentHeader";
import ButtonPrimary from "../../../components/share/ButtonPrimary";
import MultiChoiceQuestion from "@/components/classroom_modules/question/MultiChoiceQuestion";
import YesNoQuestion from "@/components/classroom_modules/question/YesNoQuestion";

export default {
  name: "ChoiceQuizCreate",
  components: {YesNoQuestion, MultiChoiceQuestion, ButtonPrimary, ContentHeader},
  data: () => ({
    rules: {
      required: value => !!value || 'Required.',
    },
    form: {
      name: null,
      classroom: null,
      questions: [
        {
          text: null,
          point: 0,
          resourcetype: null
        },
      ]
    }
  }),
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      let id = this.$route.params.choice_quiz_id
      this.form = await this.$store.dispatch('classroom_modules/choicequiz/getChoiceQuiz', id)
    },
    delete_question(index) {
      if (this.form.questions.length > 1) {
        this.form.questions.splice(index, 1)
      }
    },
    add_question(type) {
      let question = {
        text: null,
        point: 0,
        resourcetype: type
      }
      if (type === 'YesNoQuestion') {
        question['choice_answer'] = true
      } else if (type === 'MultiChoiceQuestion') {

        question['choice_set'] = [
          {text: null, is_answer: false},
          {text: null, is_answer: false},
        ]

      }
      this.form.questions.push(question)
    },
    async save() {
      let data = await this.$store.dispatch("classroom_modules/choicequiz/updateChoiceQuiz", this.form)
      if (data) {
        await this.$router.push({'name': 'ChoiceQuizIndex'})
      }
    }
  }
}
</script>

<style scoped>

</style>