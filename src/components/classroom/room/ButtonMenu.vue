<template>
  <div>
    <div class=" d-flex justify-space-around ma-4 ">
      <v-bottom-navigation
          multiple
          rounded-pill
          height="50"
          width="800"
          dark
      >
        <v-btn>
          <span>Mute</span>
          <v-icon>mdi-microphone</v-icon>
        </v-btn>

        <v-btn>
          <span>Pause Video</span>
          <v-icon>mdi-video</v-icon>
        </v-btn>

        <v-btn @click="sharescreen(true)" v-if="!sharescreenState.host">
          <span>Share Screen</span>
          <v-icon>mdi-laptop</v-icon>
        </v-btn>

        <v-btn @click="sharescreen(false)" v-if="!(!sharescreenState.host || sharescreenState.host.pk !== user.pk)">
          <span>UnShare Screen</span>
          <v-icon>mdi-laptop-off</v-icon>
        </v-btn>

        <v-bottom-sheet v-model="sheet">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
            >
              <span>Other</span>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                @click="sheet = false"
            >
              <v-list-item-title>
                <div class=" d-flex justify-space-around ma-4 ">
                  <v-btn @click="new_action('ChoiceQuiz')" :disabled="room_state.state !== 'normal'">
                    <v-icon>mdi-clipboard-edit-outline</v-icon>
                    <span> Start Choice Quiz</span>
                  </v-btn>

                  <v-btn @click="new_action('Attendance')" :disabled="room_state.state !== 'normal'">
                    <v-icon>mdi-account-multiple</v-icon>
                    <span> Start Attendance</span>
                  </v-btn>

                  <v-btn @click="new_action('GameQuestion')" :disabled="room_state.state !== 'normal'">
                    <v-icon>mdi-gamepad-variant-outline</v-icon>
                    <span> Start Game Question</span>
                  </v-btn>

                  <v-btn @click="new_action('Poll')" :disabled="room_state.state !== 'normal'">
                    <v-icon>mdi-chart-line</v-icon>
                    <span> Start Poll</span>
                  </v-btn>

                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-bottom-sheet>
        <v-btn v-if="room_state.state === 'normal'" @click="SwitchChatParticipant">
          <span> Show {{ room_state.module === 'Chat' ? 'Participant' : 'Chat' }}</span>
          <v-icon>mdi-{{ room_state.module === 'Chat' ? 'account-group' : 'forum' }}</v-icon>
        </v-btn>

        <v-btn
            @click="end"
            :disabled="room_state.state !== 'normal'">
          <span>End Call</span>
          <v-icon>mdi-phone-off-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
name: "ButtonMenu",
  props: {
  room_state: {
    type : Object,
    require: true
  },
  },
  data(){
  return {
    sheet: false,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      sharescreenState :state => state.classroom_modules.web_rtc.sharescreenState
    }),

  },
  methods: {
    async end() {
      await this.$router.push({name: 'BoardClassroom', params: {id: this.$route.params.id}})
    },
    SwitchChatParticipant() {
      if (this.room_state.module === 'Chat') {
        this.room_state.module = 'ParticipantCard'
      } else {
        this.room_state.module = 'Chat'
      }
    },
    new_action(module_name) {},

    sharescreen(e) {
      this.$store.commit('classroom_modules/web_rtc/set_share_screen_active',e)
      this.$emit('sharescreen',e)
    }
  }
}
</script>

<style scoped>

</style>