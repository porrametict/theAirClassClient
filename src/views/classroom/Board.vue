<template>
  <div v-if="classroom">
    <!-- header-->
    <div class="d-flex justify-start">
      <ClassroomImageDisplay
          :classroom="classroom"
          width="60"
          height="60"
          class="mx-2"
      >
      </ClassroomImageDisplay>

      <div class="d-flex justify-space-between" style="width: 100%">
        <p class="display-1 font-weight-bold">
          {{ classroom.name }}
        </p>
        <v-menu offset-y v-if="user_role <= 2"
                nudge-bottom="5">
          <template v-slot:activator="{ on }">
            <v-btn icon
                   outlined
                   color="grey"
                   dark
                   v-on="on"
            >
              <v-icon>
                mdi-dots-horizontal
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                @click="$router.push({name : 'MainClassroom'})"
            >
              <v-list-item-title>manage Classroom</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <v-divider class="my-2"></v-divider>
    <!--body-->
    <div>
      <v-btn @click="gotoRoom">Go To Room Page
      </v-btn>
      <p class="display-4 text-center grey--text">Coming Soon.</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ButtonIcon from "../../components/share/ButtonIcon";
import ClassroomImageDisplay from "../../components/classroom/ClassroomImageDisplay";

export default {
  name: "ClassroomBoard",
  components: {ClassroomImageDisplay, ButtonIcon},
  data() {
    return {
      user_role: null
    }
  },
  computed: {
    ...mapState({
      classroom: state => state.classroom.classroom,
      user: state => state.user.user
    })
  },
  async mounted() {
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
      let id = this.$route.params.id
      await this.$store.dispatch('classroom/retrieveClassroom', id)
    },
    async gotoRoom() {
      let id = this.$route.params.id
      let room = await this.$store.dispatch('classroom/room/createRoom', {classroom: id})
      if (room) {
        await this.$router.push({name: 'RoomClassroom', params: {id: id, room_id: room.id}})
      }
    }
  }
}
</script>

<style scoped>

</style>