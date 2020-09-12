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
  name: "AttendanceIndex",
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
      this.data_table = data.attendancestudentplay_set_data
    },
  }
}
</script>

<style scoped>

</style>