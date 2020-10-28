<template>
  <div v-if="data_table">
    <ContentHeader class="my-2">
      <div class="">
        <span>Game Question : View</span>
      </div>
    </ContentHeader>
    <v-card>
      <v-card-title>
        <span>{{ data.module_data.name }}</span>
        <v-spacer></v-spacer>
        <v-btn color="green" class="white--text" @click="exportData">Export</v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="data_table"
            hide-default-footer
        >
          <template v-slot:item.student_data="{item}">
            <div>
              {{ item.student_data.first_name }} {{ item.student_data.last_name }}
            </div>
          </template>
          <template v-slot:item.is_reply="{item}">
            <div>
              <v-icon :color="item.is_reply ? 'green' : 'red'">
                {{ item.is_reply ? 'mdi-check' : 'mdi-close' }}
              </v-icon>
            </div>
          </template>

          <template v-slot:item.is_true="{item}">
            <div>
              <v-icon color="green" v-if="item.is_true===true">
                mdi-check
              </v-icon>
              <v-icon color="red" v-else-if="item.is_true===false">
                mdi-close
              </v-icon>
            </div>
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
import moment from "moment";

export default {
  name: "AttendanceView",
  components: {ConfirmDialog, ContentHeader, ButtonIcon, ButtonPrimary},
  data() {
    return {
      data: null,
      data_table: null,
      headers: [
        {text: 'Name', value: 'student_data', sortable: false},
        {text: 'attend', value: 'is_reply', sortable: false},
        {text: 'answer', value: 'is_true', sortable: false},
        {text: 'point', value: 'point', sortable: false},
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
    async loadData() {
      let id = this.$route.params.game_question_play_id
      let data = await this.$store.dispatch('classroom_modules/gamequestion/getGameQuestionPlay', id)
      this.data = data
      this.data_table = data.studentplay_set_data
    },
    async exportData() {
      let file_name = `${this.data.module_data.name} ${moment(this.data.created).format('lll')}`
      let id = this.$route.params.game_question_play_id
      await this.$store.dispatch('classroom_modules/gamequestion/exportGameQuestionPlay', {id: id, file_name: file_name})
    }
  }
}
</script>

<style scoped>

</style>