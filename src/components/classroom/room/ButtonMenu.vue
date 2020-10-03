<template>
  <div>
    <div class="d-flex justify-space-around ma-4">
      <v-bottom-navigation multiple rounded-pill height="50" width="800" dark>
        <v-btn  @click="set_microphone_active">
          <span>Mute</span>
          <v-icon
            >{{
              microphone_active === true
                ? "mdi-microphone"
                : "mdi-microphone-off"
            }}
          </v-icon>
        </v-btn>
        <v-btn  @click="set_videoStream_active">
          <span>Pause Video</span>
          <v-icon>{{
              videoStream_active === true
                ? "mdi-video"
                : "mdi-video-off-outline"
            }}</v-icon>
        </v-btn>

        <v-btn @click="sharescreen(true)" v-if="!sharescreenState.host">
          <span>Share Screen</span>
          <v-icon>mdi-laptop</v-icon>
        </v-btn>

        <v-btn
          @click="sharescreen(false)"
          v-if="
            !(!sharescreenState.host || sharescreenState.host.pk !== user.pk)
          "
        >
          <span>UnShare Screen</span>
          <v-icon>mdi-laptop-off</v-icon>
        </v-btn>

        <v-bottom-sheet v-model="sheet" v-if="role <3">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              <span>Other</span>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="sheet = false">
              <v-list-item-title>
                <div class="d-flex justify-space-around ma-4">
                  <v-btn
                    @click="new_action('ChoiceQuiz')"
                    :disabled="room_state.state !== 'normal'"
                  >
                    <v-icon>mdi-clipboard-edit-outline</v-icon>
                    <span> Start Quiz</span>
                  </v-btn>

                  <v-btn
                    @click="new_action('Attendance')"
                    :disabled="room_state.state !== 'normal'"
                  >
                    <v-icon>mdi-account-multiple</v-icon>
                    <span> Start Attendance</span>
                  </v-btn>

                  <v-btn
                    @click="new_action('GameQuestion')"
                    :disabled="room_state.state !== 'normal'"
                  >
                    <v-icon>mdi-gamepad-variant-outline</v-icon>
                    <span> Start Game Question</span>
                  </v-btn>

                  <v-btn
                    @click="new_action('Poll')"
                    :disabled="room_state.state !== 'normal'"
                  >
                    <v-icon>mdi-chart-line</v-icon>
                    <span> Start Poll</span>
                  </v-btn>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-bottom-sheet>
        <v-btn
          v-if="room_state.state === 'normal'"
          @click="SwitchChatParticipant"
        >
          <span>
            Show
            {{ room_state.module === "Chat" ? "Participant" : "Chat" }}</span
          >
          <v-icon
            >mdi-{{
              room_state.module === "Chat" ? "account-group" : "forum"
            }}</v-icon
          >
        </v-btn>

        <v-btn @click="end" :disabled="room_state.state !== 'normal'">
          <span>End Call</span>
          <v-icon>mdi-phone-off-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ButtonMenu",
  props: {
    role: {
      type: Number,
      require: true,
    },
    room_state: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      sheet: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      sharescreenState: (state) =>
        state.classroom_modules.web_rtc.sharescreenState,
      microphone_active: (state) =>
        state.classroom_modules.web_rtc.microphoneActive,
      videoStream_active: (state) =>
        state.classroom_modules.web_rtc.videoStreamActive,
    }),
  },
  methods: {
    async end() {
      await this.$router.push({
        name: "BoardClassroom",
        params: { id: this.$route.params.id },
      });
    },
    SwitchChatParticipant() {
      if (this.room_state.module === "Chat") {
        this.room_state.module = "ParticipantCard";
      } else {
        this.room_state.module = "Chat";
      }
    },
    new_action(module_name) {
      this.$emit('new_action',module_name)
    },

    sharescreen(e) {
      this.$store.commit(
        "classroom_modules/web_rtc/set_share_screen_active",
        e
      );
      this.$emit("sharescreen", e);
    },
    set_microphone_active() {
      this.$store.commit(
        "classroom_modules/web_rtc/set_microphone_active",
        !this.microphone_active
      );
    },
    set_videoStream_active() {
      this.$store.commit(
        "classroom_modules/web_rtc/set_videoStream_active",
        !this.videoStream_active
      );
    },

  },
};
</script>

<style scoped>
</style>