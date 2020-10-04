<template>
  <div v-if="data_table">
    <ContentHeader class="my-2">
      <div class="">
        <span>Attendance : View</span>
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
          <template v-slot:item.present="{item}">
            <div>
              <v-icon :color="item.present ? 'green' : 'red'">
                {{ item.present ? 'mdi-check' : 'mdi-close' }}
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

export default {
  name: "AttendanceView",
  components: {ConfirmDialog, ContentHeader, ButtonIcon, ButtonPrimary},
  data() {
    return {
      data: null,
      data_table: null,
      headers: [
        {text: 'Name', value: 'student_data', sortable: false},
        {text: 'Present', value: 'present', sortable: false},
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
      let id = this.$route.params.attendance_play_id
      let data = await this.$store.dispatch('classroom_modules/attendance/getAttendancePlay', id)
      this.data = data
      this.data_table = data.studentplay_set_data
    },
    async exportData() {
      let file_name = this.data.module_data.name
      let id = this.$route.params.attendance_play_id
      await this.$store.dispatch('classroom_modules/attendance/exportAttendancePlay', {id: id, file_name: file_name})
    }
  }
}
</script>

<style scoped>

</style>