<template>
  <div v-if="data_table">
    <ContentHeader class="my-2">
      <div class="">
        <span>Quiz Play : View</span>
      </div>
    </ContentHeader>
    <v-card>
      <v-card-title>
        <span>{{ data.module_data.name }}</span>
        <v-spacer></v-spacer>
        <v-btn color="green" class="white--text" @click="exportData">Export</v-btn>
      </v-card-title>
      <v-card-text>
        <div>
          <p class="title">Question</p>
          <div v-for="(question,index) in data.module_data.questions" :key="index">
            <div>{{ index + 1 }}. {{ question.text }}</div>
          </div>
        </div>
        <v-data-table
            :headers="headers"
            :items="data_table"
            hide-default-footer
        >
          <template v-slot:body="props">
            <tr v-for="item in props.items">
              <td v-for="(header, index) in headers">
                <span v-if="header.value ==='student_data'">
                    {{ item.student_data.first_name }}  {{ item.student_data.last_name }}
                </span>
                <span v-else>

                  <span v-if="item.question_reply[index -1]['is_reply']">
                     <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              :color="item.question_reply[index -1]['is_true'] ? 'green' : 'red'"
                              dark
                              v-bind="attrs"
                              v-on="on"
                          >mdi-{{ item.question_reply[index - 1]['is_true'] ? 'check' : 'close' }}</v-icon>
                        </template>
                        <span>{{ item.question_reply[index - 1]['is_true'] ? 'correct' : 'incorrect' }}</span>
                      </v-tooltip>
                  </span>

                  <span v-else>
                         <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                              v-bind="attrs"
                              v-on="on"
                          >mdi-account-remove</v-icon>
                        </template>
                        <span>not attend</span>
                      </v-tooltip>

                  </span>
                </span>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-divider></v-divider>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ButtonPrimary from "../../../components/share/ButtonPrimary";
import ButtonIcon from "@/components/share/ButtonIcon";
import ContentHeader from "@/components/share/ContentHeader";
import ConfirmDialog from "@/components/share/ConfirmDialog";
import moment from 'moment'
export default {
  name: "AttendanceView",
  components: {ConfirmDialog, ContentHeader, ButtonIcon, ButtonPrimary},
  data() {
    return {
      data: null,
      data_table: null,
      headers: [
        {text: 'Name', value: 'student_data', sortable: false},
      ]
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    change_page(e) {
      this.form_params.page = e
      this.loadData()
    },
    generate_page(data) {
      this.total_page = Math.ceil(data.count / 10)
    },
    generate_question_column() {
      let questions = this.data.module_data.questions
      for (let i = 0; i < questions.length; i++) {
        this.headers.push(
            {text: `Question ${i + 1}`, value: `question_${i}`, sortable: false},
        )
      }

    },
    async loadData() {
      let id = this.$route.params.choice_quiz_play_id
      let data = await this.$store.dispatch('classroom_modules/choicequiz/getChoiceQuizPlay', id)
      this.data = data
      this.data_table = data.studentplay_set_data
      this.generate_question_column()
    },
    async exportData() {
      let file_name = `${this.data.module_data.name} ${moment(this.data.created).format('lll')}`
      let id = this.$route.params.choice_quiz_play_id
      await this.$store.dispatch('classroom_modules/choicequiz/exportChoiceQuizPlay', {id: id, file_name: file_name})
    }
  }
}
</script>

<style scoped>

</style>