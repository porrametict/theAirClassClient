<template>
  <div>
    <!--header-->
    <div class="mt-2">
      <v-row align="center" justify="end">
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
    </div>
    <div>
      <!-- Member-->
      <div v-if="members">
        <v-card>
          <v-card-title>
            Member
          </v-card-title>

          <v-data-table
              :headers="headers_member"
              :items="members"
              hide-default-footer
          >
            <template v-slot:item.module="{item}">
              {{ item }}
            </template>

            <template v-slot:item.created="{item}">
              <div>
                {{ get_th_time(item.created) }}
              </div>
            </template>

            <template v-slot:item.manage="{ item }">
              <div class="d-flex justify-center">
                <ButtonIcon class="mx-1" icon="mdi-eye" tooltip_text="view" @click="gotoView(item)"></ButtonIcon>
                <ConfirmDialog
                    message="remove this user form classroom ?"
                    @change="delete_member($event,item)"
                >
                  <template v-slot:activator="{on}">
                    <v-btn
                        icon
                        outlined
                        color="red"
                        v-on="on"
                        :disabled="item.role ===1 || user_role !==1"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </ConfirmDialog>
              </div>

            </template>
          </v-data-table>
          <v-divider></v-divider>

          <div class="text-center" v-if="form_params.length>1">
            <v-pagination
                v-model="form_params.page"
                :length="form_params.length"
                :total-visible="5"
                circle
                @input="changePage"
            ></v-pagination>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ConfirmDialog from "@/components/share/ConfirmDialog";
import ButtonIcon from "@/components/share/ButtonIcon";

export default {
  name: "ScoreIndex",
  components: {ButtonIcon, ConfirmDialog},
  data() {
    return {
      user_role: null,
      members: null,
      form_params: {
        search: null,
        room__classroom__id: null,
        page: 1,
        length: 0,
      },
      headers_member: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'module_data.name',
        }, {
          text: 'Type',
          align: 'start',
          sortable: false,
          value: 'module_data.resourcetype',
        },
        {
          text: 'Created ',
          align: 'center',
          sortable: false,
          value: 'created',
        },
        {
          text: "Manage",
          align: 'center',
          value: "manage",
          sortable: false,

        },
      ],
    }

  },
  computed: {
    ...mapState({
      classroom: state => state.classroom.classroom,
      user: state => state.user.user

    })
  },
  async mounted() {
    this.form_params.room__classroom__id = this.classroom.id
    await this.loadData()
    await this.checkUserRole()

  },
  methods: {
    async checkUserRole() {
      let data = await this.$store.dispatch('classroom/getListClassroomByUser', {
        'user__id': this.user.pk,
        'classroom_id': this.classroom.id
      })
      this.user_role = data.results[0]['role']
    },
    async loadData() {
      let data = await this.$store.dispatch('classroom_modules/score/getScores', this.form_params)
      this.form_params.length = Math.ceil(data.count / 10)
      this.members = data.results
    },
    changePage(page) {
      this.form_params.page = page
      this.loadData()
    },
    async changeMemberRole(item, new_role) {
      item.role = new_role
      let data = await this.$store.dispatch('classroom/member/updateMember', item)
      if (data != null) {
        await this.loadData()
      }
    },
    gotoView(item) {
      this.$router.push({
        name: 'ScoreView',
        params: {
          score_id: item.id
        }
      })

    },
    async delete_member(e, item) {
      if (e) {
        let data = await this.$store.dispatch('classroom/member/deleteMember', item.id)
        if (data != null) {
          await this.loadData()
        }
      }

    },
  }
}
</script>

<style scoped>

</style>
