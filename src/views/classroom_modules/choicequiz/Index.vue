<template>
  <div v-if="choice_quizzes">
    <ContentHeader class="my-2">
      <div class="">
        <span>Choice Quiz</span> |
      </div>
    </ContentHeader>

    <v-card>
      <v-card-title class="d-flex justify-space-between ">
        <v-row align="center" justify="end">
          <v-col>
            <ButtonPrimary @click="$router.push({name :'ChoiceQuizCreate'})">Add</ButtonPrimary>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
                filled
                rounded
                hide-details
                dense
                append-icon="mdi-magnify"
                placeholder="search"
                v-model="form_params.search"
                @keydown.13="loadData"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="choice_quizzes"
            hide-default-footer
        >
          <template v-slot:item.created="{item}">
            <div>
              {{ get_th_time(item.created) }}
            </div>
          </template>

          <template v-slot:item.usage_status="{item}">
            <div>
              <v-icon :color="item.usage_status ? 'green' : 'grey'">
                mdi-check
                <!--                {{ item.usage_status ? 'mdi-check' : 'mdi-close' }}-->
              </v-icon>
            </div>
          </template>

          <template v-slot:item.manage=" { item } ">
            <div class="d-flex justify-center" v-if="!item.usage_status">
              <ButtonIcon class="mx-1" icon="mdi-pencil" tooltip_text="edit" @click="gotoEdit(item)"></ButtonIcon>
              <ConfirmDialog
                  message="remove this item ?"
                  @change="deleteItem($event,item)"
              >
                <template v-slot:activator="{on}">
                  <v-btn
                      icon
                      outlined
                      color="red"
                      v-on="on"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>

              </ConfirmDialog>
            </div>
            <div v-else>
              <ButtonIcon class="mx-1" icon="mdi-eye" tooltip_text="view history" @click="gotoView(item)"></ButtonIcon>
            </div>
          </template>

        </v-data-table>
        <v-divider></v-divider>

        <div class="text-center" v-if="form_params.total_page > 1">
          <v-pagination v-model="form_params.page"
                        :length="form_params.total_page"
                        circle
                        :total-visible="5"
                        @input="change_page"
          ></v-pagination>
        </div>
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
  name: "ChoiceQuizIndex",
  components: {ConfirmDialog, ContentHeader, ButtonIcon, ButtonPrimary},
  data() {
    return {
      form_params: {
        search: "",
        classroom: null,
        total_page: 0,
        page: 1,
      },
      choice_quizzes: null,
      headers: [
        {text: 'Name', value: 'name', sortable: false},
        {text: 'Created', value: 'created', sortable: false},
        {text: 'Usage Status', align: 'center', value: 'usage_status', sortable: false},
        {text: 'Manage', align: 'center', value: 'manage', sortable: false},
      ]
    }
  },
  async mounted() {
    this.form_params.classroom = this.$route.params.id
    await this.loadData()
  },
  methods: {
    change_page(e) {
      this.form_params.page = e
      this.loadData()
    },
    generate_page(data) {
      this.form_params.total_page = Math.ceil(data.count / 10)
    },
    async loadData() {
      let data = await this.$store.dispatch('classroom_modules/choicequiz/getChoiceQuizzes', this.form_params)
      this.generate_page(data)
      this.choice_quizzes = data.results
    },
    async gotoEdit(item) {
      await this.$router.push({
        name: 'ChoiceQuizEdit',
        params: {
          choice_quiz_id: item.id
        }
      })
    },
    async gotoView(item) {
      await this.$router.push({
        name: 'ChoiceQuizPlayIndex',
        params: {
          choice_quiz_id: item.id
        }
      })
    },
    async deleteItem(e, item) {
      if (e) {
        let data = await this.$store.dispatch('classroom_modules/choicequiz/deleteChoiceQuiz', item.id)
        if (data != null) {
          await this.loadData()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>