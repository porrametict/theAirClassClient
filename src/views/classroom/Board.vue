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
        <div>
          <v-btn @click="startMeeting" :disabled="disableMeetBtn" small tile color="primary" class="mx-2">
            <v-icon class="mr-1">
              mdi-video-box
            </v-icon>
            Meet
          </v-btn>
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
    </div>
    <v-divider class="my-2"></v-divider>
    <!--body-->
    <div>
      <div v-if="rooms.length">
        <div v-for="(room,index) in rooms" :key="index" class="ma-4">
          <RoomRender :room="room" @click="gotoRoom"></RoomRender>
        </div>
      </div>
      <div v-else>
        <FreeLicenseImage
            asset_src="classroom-pana.png"
            height="500"
            width="500"
            a_text="Designed by stories / Freepik"
            href="http://www.freepik.com"
        >
        </FreeLicenseImage>
      </div>
    </div>
    <RoomNameInputDialog :key="RoomNameInputDialogKey" :dialog="dialog" @change="createRoom"></RoomNameInputDialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ButtonIcon from "../../components/share/ButtonIcon";
import ClassroomImageDisplay from "../../components/classroom/ClassroomImageDisplay";
import RoomNameInputDialog from "@/components/classroom/room/RoomNameInputDialog";
import FreeLicenseImage from "@/components/share/FreeLicenseImage";
import RoomRender from "@/components/classroom/room/RoomRender";

export default {
  name: "ClassroomBoard",
  components: {RoomRender, FreeLicenseImage, RoomNameInputDialog, ClassroomImageDisplay, ButtonIcon},
  data() {
    return {
      disableMeetBtn :false,
      dialog: false,
      RoomNameInputDialogKey: 0,
      user_role: null,
      rooms: [],
      room_form: {
        classroom: null,
        name: null,
        status: true
      }
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
    async loadRooms() {
      let classroom_id = this.$route.params.id
      this.rooms = await this.$store.dispatch('classroom/room/getRooms', {'classroom_id': classroom_id})
      this.checkLastRoomStatus()
    },
    checkLastRoomStatus () {
      if(this.rooms && this.rooms.length){
        this.disableMeetBtn = this.rooms[this.rooms.length-1].status
      }
    },
    async loadData() {
      let id = this.$route.params.id
      await this.$store.dispatch('classroom/retrieveClassroom', id)
      await this.loadRooms()
    },
    startMeeting() {
      this.dialog = true
      this.RoomNameInputDialogKey += 1
    },
    async createRoom(name) {
      this.room_form.classroom = this.$route.params.id
      this.room_form.name = name
      let room = await this.$store.dispatch('classroom/room/createRoom', this.room_form)
      if (room) {
        await this.gotoRoom(room)
      }
    },
    async gotoRoom(room) {
      let id = this.$route.params.id
      await this.$router.push({name: 'RoomClassroom', params: {id: id, room_id: room.id}})
    }
  }
}
</script>

<style scoped>

</style>
