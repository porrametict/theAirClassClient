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
            <template v-slot:item.user_data="{item}">
              {{ item.user_data.first_name }} {{ item.user_data.last_name }}
            </template>

            <template v-slot:item.role="{item}">
              <RoleSelect :value="item.role" @input="changeMemberRole(item,$event)" :disable="user_role !== 1"></RoleSelect>
            </template>

            <template v-slot:item.manage="{ item }">
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
            </template>
          </v-data-table>
          <v-divider></v-divider>

          <div class="text-center" v-if="form_params.length>1">
            <v-pagination
                v-model="form_params.page"
                :length="form_params.length"
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
import ContentHeader from "../../../components/share/ContentHeader";
import ButtonIcon from "../../../components/share/ButtonIcon";
import ConfirmDialog from "../../../components/share/ConfirmDialog";
import {mapState} from "vuex";
import RoleSelect from "@/components/classroom/member/RoleSelect";

export default {
  name: "MemberIndex",
  components: {RoleSelect, ConfirmDialog, ButtonIcon, ContentHeader},
  data() {
    return {
      user_role : null,
      members: null,
      form_params: {
        search: null,
        classroom__id: null,
        page: 1,
        length: 0,
      },
      headers_member: [
        {
          text: 'Name ',
          align: 'start',
          sortable: false,
          value: 'user_data',
        },
        {
          text: 'Role ',
          align: 'center',
          sortable: false,
          width: 300,
          value: 'role',
        },
        {
          text: "Manage",
          align: 'center',
          value: "manage"
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
    this.form_params.classroom__id = this.classroom.id
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
      let data = await this.$store.dispatch('classroom/member/getListMember', this.form_params)
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
