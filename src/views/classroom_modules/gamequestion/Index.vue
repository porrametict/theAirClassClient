<template>
  <div v-if="game_question_plays">
    <ContentHeader class="my-2">
      <div class="">
        <span>Game Question</span>
      </div>
    </ContentHeader>

    <v-card>
      <v-card-title class="d-flex justify-space-between ">
        <v-row align="center" justify="end">
          <v-col cols="12" md="4">
            <!--            <v-text-field-->
            <!--                filled-->
            <!--                rounded-->
            <!--                hide-details-->
            <!--                dense-->
            <!--                append-icon="mdi-magnify"-->
            <!--                placeholder="search"-->
            <!--                v-model="form_params.search"-->
            <!--                @keydown.13="loadData"-->
            <!--            ></v-text-field>-->
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table
            :headers="headers"
            :items="game_question_plays"
            hide-default-footer
        >

          <template v-slot:item.created="{item}">
            <div>
              {{ get_th_time(item.created) }}
            </div>
          </template>

          <template v-slot:item.manage=" { item } ">
            <div class="d-flex justify-center">
              <ButtonIcon class="mx-1" icon="mdi-eye" tooltip_text="view" @click="gotoView(item)"></ButtonIcon>
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
  name: "GameQuestionIndex",
  components: {ConfirmDialog, ContentHeader, ButtonIcon, ButtonPrimary},
  data() {
    return {
      form_params: {
        search: "",
        room__classroom__id: null,
        total_page: 0,
        page: 1,
      },
      game_question_plays: null,
      headers: [
        {text: 'Name', value: 'module_data.name', sortable: false},
        {text: 'Created', value: 'created', sortable: false},
        {text: 'Manage', align: 'center', value: 'manage', sortable: false},

      ]
    }
  },
  async mounted() {
    this.form_params.room__classroom__id = this.$route.params.id
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
      let data = await this.$store.dispatch('classroom_modules/gamequestion/getGameQuestionPlays', this.form_params)
      this.generate_page(data)
      this.game_question_plays = data.results
    },
    async gotoView(item) {
      await this.$router.push({
        name: 'GameQuestionView',
        params: {
          game_question_play_id: item.id
        }
      })
    },
    async deleteItem(e, item) {
      if (e) {
        let data = await this.$store.dispatch('classroom_modules/gamequestion/deleteGameQuestionPlay', item.id)
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