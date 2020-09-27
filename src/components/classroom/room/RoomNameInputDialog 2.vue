<template>
  <v-dialog v-model="v_dialog" max-width="600">
    <v-card>
      <slot name="head">
        <v-card-title class="primary">
          <p class="ma-0 pa-0">Meeting</p>
          <v-spacer></v-spacer>
          <v-btn icon @click="v_dialog =false">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
      </slot>

      <v-card-text class="ma-0 pa-0">
        <v-text-field outlined v-model="name" class="pa-4" hide-details label="Name">
        </v-text-field>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-around">
        <ButtonPrimary @click="go_meeting">
          Meet Now
        </ButtonPrimary>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ButtonPrimary from "@/components/share/ButtonPrimary";

export default {
  name: "RoomNameInputDialog",
  components: {ButtonPrimary},
  props: {
    value: {
      type: String,
      require: false
    },
    dialog: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  created() {
    this.name = this.value
    this.v_dialog = this.dialog
  },
  data: () => ({
    v_dialog : null,
    name: null
  }),
  methods: {
    go_meeting() {
      this.name = this.name ? this.name : 'Meeting started'
      this.$emit('change', this.name)
    }
  }
}
</script>

<style scoped>

</style>