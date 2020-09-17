<template>
  <div v-if="data_table">
    <ContentHeader class="my-2">
      <div class="">
        <span>Poll : View</span>
      </div>
    </ContentHeader>
    <v-card>
      <v-card-title>
        <span>{{ data.module_data.name }}</span>

      </v-card-title>
      <v-card-text>
        <div v-for="choice in data.results_count">
          {{choice.text}}
          <PercentageProgressBar :key="choice.id" :numerator="choice.count"
                                 :population="data.studentplay_set_data.length">

          </PercentageProgressBar>
        </div>
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
import Poll from "@/components/classroom_modules/poll/Poll";
import PercentageProgressBar from "@/components/share/PercentageProgressBar";

export default {
  name: "PollView",
  components: {PercentageProgressBar, Poll, ConfirmDialog, ContentHeader, ButtonIcon, ButtonPrimary},
  data() {
    return {
      data: null,
      data_table: null,
      headers: [
        {text: 'Name', value: 'student_data', sortable: false},
        {text: 'attend', value: 'is_reply', sortable: false},
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
      let id = this.$route.params.poll_play_id
      let data = await this.$store.dispatch('classroom_modules/poll/getPollPlay', id)
      this.data = data
      this.data_table = data.studentplay_set_data
    },
  }
}
</script>

<style scoped>

</style>